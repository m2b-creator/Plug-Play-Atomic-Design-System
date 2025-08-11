import { createSerenaConnection } from "./mcp-client.js";

async function testMCPConnection() {
  console.log("Testing MCP connection with Serena...");

  try {
    const client = await createSerenaConnection();
    console.log("✓ Successfully connected to Serena MCP server");

    // Test listing tools
    const tools = await client.listTools();
    console.log("✓ Available tools:", tools.map(t => t.name));

    // Test calling a tool
    const projectInfo = await client.callTool("get_project_info");
    console.log("✓ Project info retrieved:", projectInfo);

    // Test calling another tool
    const codeAnalysis = await client.callTool("analyze_code", { path: "src/" });
    console.log("✓ Code analysis completed:", codeAnalysis);

    await client.disconnect();
    console.log("✓ Disconnected successfully");

  } catch (error) {
    console.error("✗ MCP connection test failed:", error);
    process.exit(1);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  testMCPConnection();
}

export { testMCPConnection };