package com.mutum.patadeveludo.exception;

import jakarta.persistence.EntityNotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.stream.Collectors;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    // -------------------------------------------------------------------------
    // 404 Not Found
    // -------------------------------------------------------------------------

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleEntityNotFound(EntityNotFoundException ex) {
        log.debug("Entity not found: {}", ex.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(ErrorResponse.of("NOT_FOUND", ex.getMessage()));
    }

    // -------------------------------------------------------------------------
    // 400 Bad Request — validation
    // -------------------------------------------------------------------------

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidation(MethodArgumentNotValidException ex) {
        Map<String, String> fieldErrors = ex.getBindingResult().getFieldErrors().stream()
                .collect(Collectors.toMap(
                        FieldError::getField,
                        fe -> fe.getDefaultMessage() != null ? fe.getDefaultMessage() : "Inválido",
                        (a, b) -> a
                ));

        log.debug("Validation failed: {}", fieldErrors);
        return ResponseEntity.badRequest()
                .body(ErrorResponse.ofValidation("VALIDATION_ERROR",
                        "Dados de entrada inválidos", fieldErrors));
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ErrorResponse> handleIllegalArgument(IllegalArgumentException ex) {
        log.debug("Illegal argument: {}", ex.getMessage());
        return ResponseEntity.badRequest()
                .body(ErrorResponse.of("BAD_REQUEST", ex.getMessage()));
    }

    // -------------------------------------------------------------------------
    // 400 Bad Request — unsupported gateway
    // -------------------------------------------------------------------------

    @ExceptionHandler(UnsupportedGatewayException.class)
    public ResponseEntity<ErrorResponse> handleUnsupportedGateway(UnsupportedGatewayException ex) {
        log.warn("Unsupported gateway: {}", ex.getMessage());
        return ResponseEntity.badRequest()
                .body(ErrorResponse.of("UNSUPPORTED_GATEWAY", ex.getMessage()));
    }

    // -------------------------------------------------------------------------
    // 400 Bad Request — invalid webhook signature
    // -------------------------------------------------------------------------

    @ExceptionHandler(WebhookSignatureException.class)
    public ResponseEntity<ErrorResponse> handleWebhookSignature(WebhookSignatureException ex) {
        log.warn("Invalid webhook signature: {}", ex.getMessage());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(ErrorResponse.of("INVALID_SIGNATURE", ex.getMessage()));
    }

    // -------------------------------------------------------------------------
    // 401 Unauthorized
    // -------------------------------------------------------------------------

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ErrorResponse> handleBadCredentials(BadCredentialsException ex) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(ErrorResponse.of("UNAUTHORIZED", "Email ou senha incorretos"));
    }

    // -------------------------------------------------------------------------
    // 403 Forbidden
    // -------------------------------------------------------------------------

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ErrorResponse> handleAccessDenied(AccessDeniedException ex) {
        log.debug("Access denied: {}", ex.getMessage());
        return ResponseEntity.status(HttpStatus.FORBIDDEN)
                .body(ErrorResponse.of("FORBIDDEN", "Acesso negado"));
    }

    // -------------------------------------------------------------------------
    // 500 Internal Server Error — catch-all
    // -------------------------------------------------------------------------

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGeneral(Exception ex) {
        log.error("Unhandled exception", ex);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ErrorResponse.of("INTERNAL_ERROR", "Erro interno do servidor"));
    }

    // -------------------------------------------------------------------------
    // Error response record
    // -------------------------------------------------------------------------

    public record ErrorResponse(
            String error,
            String message,
            LocalDateTime timestamp,
            Map<String, String> fieldErrors
    ) {
        public static ErrorResponse of(String error, String message) {
            return new ErrorResponse(error, message, LocalDateTime.now(), null);
        }

        public static ErrorResponse ofValidation(String error, String message,
                                                 Map<String, String> fieldErrors) {
            return new ErrorResponse(error, message, LocalDateTime.now(), fieldErrors);
        }
    }
}
