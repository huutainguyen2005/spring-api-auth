    package vn.edu.fpt.sba.configuration;

    import org.springframework.context.annotation.Bean;
    import org.springframework.context.annotation.Configuration;
    import org.springframework.security.authentication.AuthenticationManager;
    import org.springframework.security.config.Customizer;
    import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
    import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
    import org.springframework.security.config.annotation.web.builders.HttpSecurity;
    import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
    import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
    import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
    import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
    import org.springframework.security.web.SecurityFilterChain;
    import org.springframework.web.cors.CorsConfiguration;
    import org.springframework.web.cors.CorsConfigurationSource;
    import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

    import java.util.List;

    @Configuration
    @EnableWebSecurity
    @EnableMethodSecurity
    public class SecurityConfig {

        // Giả sử scope artists.read -> GET list  & getById
        //        scope artists.write -> PUT/POST/DELETE

//        @Bean
//        public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//
//            // Khai báo đây là 1 resource server
//            http.oauth2ResourceServer(oauth2 ->
//                    oauth2.jwt(Customizer.withDefaults()));
//
//            return http.build();
//        }

        // Tất cả request match chỉ được câp phếp nếu JWT Authority: SCOPE_openid | SCOPE_profile | SCOPE_email
        // VD: Token (jwt) có scope profile -> Spring hiểu authority là SCOPE_profile, v.v
        // VD: Token (jwt) có scope artists.read -> Spring hiểu authority là SCOPE_artists.read, v.v
        // .oauth2ResourceServer() -> báo hiệu cho biết đây là 1 resource server
        // và dùng JWT để xác thực, dùng các cấu hình mặc định
        // Resource server sẽ validate:
        // - đọc token
        // - signature
        // - expires
        // - scope

        // 2nd approach (Convert Role_ -> Authority)
        @Bean
        SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
            http
                    .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                    .csrf(AbstractHttpConfigurer::disable)
                    .oauth2ResourceServer(oauth2 -> oauth2.jwt(
                    jwt -> jwt.jwtAuthenticationConverter(jwtAuthenticationConverter())
            ));

            return http.build();
        }

        // JWT Converter để trích xuất các thông tin thêm như ROLE_ về dạng Authority của Spring Sec
        @Bean
        public JwtAuthenticationConverter jwtAuthenticationConverter() {
            JwtGrantedAuthoritiesConverter authoritiesConverter = new JwtGrantedAuthoritiesConverter();
            authoritiesConverter.setAuthoritiesClaimName("roles");
            authoritiesConverter.setAuthorityPrefix("");
            JwtAuthenticationConverter converter = new JwtAuthenticationConverter();
            converter.setJwtGrantedAuthoritiesConverter(authoritiesConverter);
            return converter;
        }

        @Bean
        CorsConfigurationSource corsConfigurationSource() {
            CorsConfiguration configuration = new CorsConfiguration();
            configuration.setAllowedOrigins(List.of("http://localhost:5173"));
            configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
            configuration.setAllowedHeaders(List.of("*"));
            configuration.setAllowCredentials(true);

            UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
            source.registerCorsConfiguration("/**", configuration);

            return source;
        }
    }
