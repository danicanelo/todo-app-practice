import { Injectable } from '@angular/core';

export interface OllamaResponse {
  response: string;
}

@Injectable({
  providedIn: 'root'
})
export class IaService {
  private ollamaUrl = 'http://localhost:11434/api/generate';
  private model = 'llama3';

  async generateMessage(todo: string): Promise<string> {
    const prompt = `Eres un asistente sarcástico y cínico pero divertido. Di algo breve (una única sentencia de entre 20-30 palabras) como respuesta para alguien que acaba de completar esta tarea: ${todo} (o que ha incluido ese elemento en su lista de tareas, quizá sea un elemento a comprar o algo así). Sé creativo, no uses emojis. Usa el idioma en que esté escrita la tarea.`;

    const body = {
      model: this.model,
      prompt: prompt,
      stream: false
    }

    try {
      const response = await fetch(this.ollamaUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        throw new Error(`Error en la respuesta de Ollama: ${response.status}`);
      }

      const data: OllamaResponse = await response.json();
      return data.response;
    } catch (error) {
      console.error('Error en la solicitud a Ollama:', error);
      return '¡Tarea completada!';
    }
  }
  constructor() { }
}
