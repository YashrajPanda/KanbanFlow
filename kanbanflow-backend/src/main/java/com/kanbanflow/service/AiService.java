package com.kanbanflow.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kanbanflow.dto.AiExpansionResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.util.Map;
import java.util.List;
import java.util.Collections;

@Service
@Slf4j
public class AiService {

    @Value("${google.gemini.api.key}")
    private String geminiApiKey;

    @Value("${google.gemini.api.url}")
    private String geminiApiUrl;

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();

    public AiExpansionResponse expandScope(String taskPrompt) {
        String systemInstruction = "You are a senior software architect. Convert the following task into a structured development plan including subtasks, acceptance criteria, and edge cases. " +
                "You MUST return ONLY valid JSON with no markdown formatting. The JSON must match this exact structure: {\"subtasks\": [\"task1\", \"task2\"], \"acceptanceCriteria\": [\"crit1\"], \"edgeCases\": [\"case1\"]}.";

        String fullPrompt = systemInstruction + "\n\nTask: " + taskPrompt;

        try {
            String url = geminiApiUrl + "?key=" + geminiApiKey;
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            Map<String, Object> requestBody = Map.of(
                "contents", List.of(
                    Map.of("parts", List.of(
                        Map.of("text", fullPrompt)
                    ))
                )
            );

            HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);
            Map<String, Object> response = restTemplate.postForObject(url, request, Map.class);
            
            if (response != null && response.containsKey("candidates")) {
                List<Map<String, Object>> candidates = (List<Map<String, Object>>) response.get("candidates");
                if (!candidates.isEmpty()) {
                    Map<String, Object> content = (Map<String, Object>) candidates.get(0).get("content");
                    List<Map<String, Object>> parts = (List<Map<String, Object>>) content.get("parts");
                    String rawText = (String) parts.get(0).get("text");
                    // Remove potential markdown blocks
                    rawText = rawText.replaceAll("```json", "").replaceAll("```", "").trim();
                    return objectMapper.readValue(rawText, AiExpansionResponse.class);
                }
            }
        } catch (Exception e) {
            log.error("Error communicating with Gemini API", e);
        }
        return new AiExpansionResponse(Collections.emptyList(), Collections.emptyList(), Collections.emptyList());
    }
}
