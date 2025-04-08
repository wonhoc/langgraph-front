export type Role = 'user' | 'assistant' | 'system';

// 요청 타입
export interface ChatRequest {
  message: string;
  history?: ChatMessage[];
}

export interface ChatMessage {
  role: Role;
  content: string;
}


// 응답 타입
export interface LLMResponse {
  response: LLMMessage[];
}

export interface LLMMessage {
  lc: number;
  type: 'constructor';
  id: [string, string, 'HumanMessage' | 'AIMessage'];
  kwargs: LLMMessageKwargs;
}

export interface LLMMessageKwargs {
  content: string;
  additional_kwargs?: Record<string, any>;
  response_metadata?: Record<string, any>;
  id?: string;

  // AIMessage에만 있을 수 있는 필드
  tool_calls?: any[];
  invalid_tool_calls?: any[];
  usage_metadata?: {
    output_tokens?: number;
    input_tokens?: number;
    total_tokens?: number;
    input_token_details?: Record<string, any>;
    output_token_details?: Record<string, any>;
  };
}