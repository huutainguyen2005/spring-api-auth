package vn.edu.fpt.sba.authserver.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.oauth2.server.authorization.config.annotation.web.configuration.OAuth2AuthorizationServerConfiguration;
import org.springframework.security.oauth2.server.authorization.config.annotation.web.configurers.OAuth2AuthorizationServerConfigurer;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

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

    // Dùng thử User in-memory
    @Bean
    UserDetailsService userDetailsService() {

        // {noop} ghi chú cho biết không cần Encoder
        UserDetails user = User.withUsername("admin")
                .password("{noop}Fpt@123")
                .roles("ADMIN")
                .build();

        return new InMemoryUserDetailsManager(user);
    }

    // Các trường password, secret, Spring sẽ tự tìm các Bean 'passwordEncoder' để thực hiện mã hoá password
    // @Bean
    // PasswordEncode -> BCrypt
}
