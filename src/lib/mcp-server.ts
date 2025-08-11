import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from "@modelcontextprotocol/sdk/types.js";

class SerenaServer {
  private server: Server;

  constructor() {
    this.server = new Server(
      {
        name: "serena-mcp-server",
        version: "0.1.0",
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.setupTools();
    this.setupHandlers();
  }

  private setupTools() {
    // Define available tools for Serena
    const tools: Tool[] = [
      {
        name: "get_project_info",
        description: "Get information about the current project",
        inputSchema: {
          type: "object",
          properties: {},
        },
      },
      {
        name: "analyze_code",
        description: "Analyze code structure and dependencies",
        inputSchema: {
          type: "object",
          properties: {
            path: {
              type: "string",
              description: "Path to analyze",
            },
          },
          required: ["path"],
        },
      },
    ];

    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools,
    }));
  }

  private setupHandlers() {
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      switch (request.params.name) {
        case "get_project_info":
          return {
            content: [
              {
                type: "text",
                text: JSON.stringify({
                  name: "atomicpnp",
                  type: "Next.js",
                  framework: "React",
                  styling: "Tailwind CSS",
                }),
              },
            ],
          };

        case "analyze_code":
          const path = request.params.arguments?.path as string;
          return {
            content: [
              {
                type: "text",
                text: `Analyzing code at path: ${path}`,
              },
            ],
          };

        default:
          throw new Error(`Unknown tool: ${request.params.name}`);
      }
    });
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
  }
}

// Start the server if this file is run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const server = new SerenaServer();
  server.run().catch(console.error);
}

export { SerenaServer };