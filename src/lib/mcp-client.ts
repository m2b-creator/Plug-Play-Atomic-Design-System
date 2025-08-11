import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

export class SerenaClient {
  private client: Client;
  private transport: StdioClientTransport | null = null;

  constructor() {
    this.client = new Client(
      {
        name: "serena-mcp-client",
        version: "0.1.0",
      },
      {
        capabilities: {},
      }
    );
  }

  async connect(command: string, args?: string[]) {
    this.transport = new StdioClientTransport({
      command,
      args: args || [],
    });

    await this.client.connect(this.transport);
  }

  async listTools() {
    const response = await this.client.listTools();
    return response.tools;
  }

  async callTool(name: string, arguments_?: Record<string, unknown>) {
      return await this.client.callTool({
      name,
      arguments: arguments_ || {},
    });
  }

  async disconnect() {
    if (this.transport) {
      await this.client.close();
      this.transport = null;
    }
  }
}

// Usage example
export async function createSerenaConnection() {
  const client = new SerenaClient();
  
  try {
    // Connect to the Serena MCP server
    await client.connect("node", ["src/lib/mcp-server.js"]);
    return client;
  } catch (error) {
    console.error("Failed to connect to Serena MCP server:", error);
    throw error;
  }
}