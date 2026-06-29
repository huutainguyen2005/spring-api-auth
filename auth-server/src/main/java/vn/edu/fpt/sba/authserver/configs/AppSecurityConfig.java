package vn.edu.fpt.sba.authserver.configs;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.server.authorization.OAuth2TokenType;
import org.springframework.security.oauth2.server.authorization.config.annotation.web.configuration.OAuth2AuthorizationServerConfiguration;
import org.springframework.security.oauth2.server.authorization.config.annotation.web.configurers.OAuth2AuthorizationServerConfigurer;
import org.springframework.security.oauth2.server.authorization.token.JwtEncodingContext;
import org.springframework.security.oauth2.server.authorization.token.OAuth2TokenCustomizer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import vn.edu.fpt.sba.authserver.repositories.UserRepository;

import java.security.Principal;
import java.util.List;

@Configuration
@EnableWebSecurity
public class AppSecurityConfig {

    @Bean
    SecurityFilterChain authorizationServerSecurityFilterChain(HttpSecurity http) throws Exception {
        // Mở các endpoint mặc định theo flow của OAuth2
        // /authorize, /token, /userinfo...
        OAuth2AuthorizationServerConfiguration.applyDefaultSecurity(http);

        // Bật OpenId Connect (OIDC)
        http.getConfigurer(OAuth2AuthorizationServerConfigurer.class)
                .oidc(Customizer.withDefaults());

        return http.formLogin(Customizer.withDefaults()).build();
    }

    // Nếu request nào không thuộc Auth Server thì login
    @Bean
    SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests(auth -> auth
                        .anyRequest()
                        .authenticated())
                .formLogin(Customizer.withDefaults());

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:5173", "http://localhost:8888"));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    // VD them thong tin bo sung vao trong JWT
    // User info username/email/dob...
    // ROLE
    @Bean
    public OAuth2TokenCustomizer<JwtEncodingContext> tokenCustomizer(UserRepository userRepository) {
        return context -> {
            // Kiem tra neu dang la access_token
            if (OAuth2TokenType.ACCESS_TOKEN.equals(context.getTokenType())) {
                var principal = context.getPrincipal();
                var authorities = principal.getAuthorities().stream().map(GrantedAuthority::getAuthority).toList();
                var user = userRepository.findByUsername(principal.getName());
                context.getClaims()
                        .claim("roles", authorities)
                        .claim("email", user.map(
                                user1 -> user1.getEmail()
                        ).orElse("no_email"));
            }
        };
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // Dùng thử User in-memory
//    @Bean
//    UserDetailsService userDetailsService() {
//
//        // {noop} ghi chú cho biết không cần Encoder
//        UserDetails user = User.withUsername("admin")
//                .password("{noop}Fpt@123")
//                .roles("ADMIN")
//                .build();
//
//        return new InMemoryUserDetailsManager(user);
//    }

    // Các trường password, secret, Spring sẽ tự tìm các Bean 'passwordEncoder' để thực hiện mã hoá password
    // @Bean
    // PasswordEncode -> BCrypt
}
