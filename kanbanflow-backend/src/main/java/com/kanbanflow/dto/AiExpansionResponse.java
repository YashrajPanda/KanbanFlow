package com.kanbanflow.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AiExpansionResponse {
    private List<String> subtasks;
    private List<String> acceptanceCriteria;
    private List<String> edgeCases;
}

