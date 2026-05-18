package com.mutum.patadeveludo.security;

import com.mutum.patadeveludo.config.JwtConfig;
import com.mutum.patadeveludo.model.Customer;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
@RequiredArgsConstructor
@Slf4j
public class JwtTokenProvider {

    private final JwtConfig jwtConfig;

    /**
     * Generates a JWT for a customer. Admin tokens use a shorter expiry.
     */
    public String generateToken(Customer customer) {
        long expiry = customer.getRole() == Customer.Role.ADMIN
                ? jwtConfig.getAdminExpirationMs()
                : jwtConfig.getExpirationMs();

        Date now    = new Date();
        Date expiry_ = new Date(now.getTime() + expiry);

        return Jwts.builder()
                .subject(customer.getId())
                .claim("email",  customer.getEmail())
                .claim("role",   customer.getRole().name())
                .claim("tier",   customer.getTier() != null ? customer.getTier().name() : null)
                .issuedAt(now)
                .expiration(expiry_)
                .signWith(getSigningKey())
                .compact();
    }

    /**
     * Extracts the customer ID (subject) from a valid token.
     */
    public String getUserIdFromToken(String token) {
        return parseClaims(token).getSubject();
    }

    /**
     * Extracts the email claim from a valid token.
     */
    public String getEmailFromToken(String token) {
        return (String) parseClaims(token).get("email");
    }

    /**
     * Extracts the role claim from a valid token.
     */
    public String getRoleFromToken(String token) {
        return (String) parseClaims(token).get("role");
    }

    /**
     * Validates a JWT token.
     *
     * @param token the JWT string
     * @return true if valid, false otherwise
     */
    public boolean validateToken(String token) {
        try {
            parseClaims(token);
            return true;
        } catch (ExpiredJwtException e) {
            log.debug("JWT token expired: {}", e.getMessage());
        } catch (UnsupportedJwtException e) {
            log.warn("JWT token unsupported: {}", e.getMessage());
        } catch (MalformedJwtException e) {
            log.warn("JWT token malformed: {}", e.getMessage());
        } catch (SecurityException e) {
            log.warn("JWT signature invalid: {}", e.getMessage());
        } catch (IllegalArgumentException e) {
            log.warn("JWT token empty/null: {}", e.getMessage());
        }
        return false;
    }

    private Claims parseClaims(String token) {
        return Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    private SecretKey getSigningKey() {
        // The secret must be a Base64-encoded key of at least 256 bits for HS256
        byte[] keyBytes;
        try {
            keyBytes = Decoders.BASE64.decode(jwtConfig.getSecret());
        } catch (IllegalArgumentException e) {
            // If not Base64, use raw bytes (development mode only)
            keyBytes = jwtConfig.getSecret().getBytes();
        }
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
