export interface AgentContext {
  messages: string[];
  maxContextSize: number;
}

export class Agent {
  private context: AgentContext;

  constructor(maxContextSize: number = 5) {
    this.context = {
      messages: [],
      maxContextSize,
    };
  }

  public addToContext(message: string): void {
    this.context.messages.push(message);
    if (this.context.messages.length > this.context.maxContextSize) {
      this.context.messages.shift(); // Remove oldest message
    }
  }

  public getContext(): string[] {
    return [...this.context.messages];
  }

  public async processInput(input: string): Promise<string> {
    this.addToContext(input);
    
    // Simulate agent processing
    const contextSummary = this.context.messages.length > 0
      ? `\nContext from previous messages: ${this.context.messages.length} items`
      : '';
    
    return `Processing: "${input}"${contextSummary}\n\nThis is a simulated response. In a real implementation, this would be processed by an AI model.`;
  }

  public clearContext(): void {
    this.context.messages = [];
  }
} 