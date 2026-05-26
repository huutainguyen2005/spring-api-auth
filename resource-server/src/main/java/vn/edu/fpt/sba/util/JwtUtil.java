package vn.edu.fpt.sba.util;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
public class JwtUtil {

    private static final String SECRET = "your-secure-secret-your-secure-secret-";
    private static long EXPIRES_MS = 1000 * 60 * 60; // Tuổi thọ là 1h

    // Để sinh ra secretKey
    public SecretKey key() {
        return Keys.hmacShaKeyFor(SECRET.getBytes(StandardCharsets.UTF_8));
    }

    // Để sinh ra JWT
    public String generateToken(String username) {
        return Jwts.builder()
                .subject(username)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + EXPIRES_MS))
                .signWith(key()) // Ký bằng key
                .compact();
    }

    public String extractUsername(String token) {
        return Jwts.parser()
                .verifyWith(key())
                .build()
                .parseEncryptedClaims(token)
                .getPayload()
                .getSubject();
    }

    public boolean validateToken(String token) {
        try {

            // Trích xuất thông tin token
            // Kiểm tra valid thì return true
            extractUsername(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
