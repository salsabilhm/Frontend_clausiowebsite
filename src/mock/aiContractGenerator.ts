// src/mock/aiContractGenerator.ts
// ------------------------------------------------------------------
// Fake / Mock data for the AI Contract Generator page.
// Pure data only — no components, no hooks, no setTimeout logic.
// Will be replaced by real AI API responses once the backend is
// ready; the shapes match ChatMessage / ProcessingStep /
// ContractSection so the page itself won't need to change.
// ------------------------------------------------------------------

export interface ProcessingStep {
  id: string;
  label: string;
  status: "pending" | "processing" | "completed";
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export interface ContractSection {
  id: string;
  title: string;
  content: string;
}

// The very first assistant message shown once the mock contract is ready
export const initialAssistantMessage: ChatMessage = {
  id: "1",
  role: "assistant",
  content:
    "I've successfully analyzed your project information and generated your initial project specification. You can now review it or ask me to improve any section.",
};

// The steps shown during the "processing" animation
export const initialProcessingSteps: ProcessingStep[] = [
  { id: "1", label: "Uploading Files...", status: "pending" },
  { id: "2", label: "Extracting Content...", status: "pending" },
  { id: "3", label: "Transcribing Audio...", status: "pending" },
  { id: "4", label: "Analyzing Conversation...", status: "pending" },
  { id: "5", label: "Understanding Requirements...", status: "pending" },
  { id: "6", label: "Generating Contract...", status: "pending" },
  { id: "7", label: "Finalizing Document...", status: "pending" },
];

// The fake generated contract, shown once "processing" finishes
export const mockContractSections: ContractSection[] = [
  {
    id: "1",
    title: " Project Overview",
    content:
      "This project involves the development of a comprehensive e-commerce mobile application for TechStart Inc. The application will provide a seamless shopping experience with advanced features including user authentication, product catalog, shopping cart, payment integration, and order management.",
  },
  {
    id: "2",
    title: " Objectives",
    content:
      "1. Create a user-friendly mobile shopping experience\n2. Implement secure payment processing\n3. Enable real-time inventory management\n4. Provide personalized product recommendations\n5. Ensure scalability for future growth",
  },
  {
    id: "3",
    title: " Project Scope",
    content:
      "The project scope includes the development of both iOS and Android applications, a robust backend API, admin dashboard for content management, and integration with third-party services including payment gateways and shipping providers.",
  },
  {
    id: "4",
    title: " Functional Requirements",
    content:
      "• User registration and authentication\n• Product browsing and search\n• Shopping cart and wishlist\n• Secure checkout process\n• Order tracking\n• Push notifications\n• User reviews and ratings\n• Social media integration",
  },
  {
    id: "5",
    title: "Technical Requirements",
    content:
      "• React Native for mobile development\n• Node.js backend with Express\n• PostgreSQL database\n• Redis for caching\n• AWS cloud infrastructure\n• Stripe payment integration\n• Firebase for push notifications",
  },
  {
    id: "6",
    title: "Timeline",
    content:
      "Phase 1: Planning & Design (2 weeks)\nPhase 2: Core Development (6 weeks)\nPhase 3: Testing & QA (2 weeks)\nPhase 4: Deployment & Launch (1 week)\nTotal: 11 weeks",
  },
  {
    id: "7",
    title: " Budget",
    content:
      "Development: $45,000 - $55,000\nDesign: $10,000 - $15,000\nProject Management: $8,000 - $12,000\nTesting & QA: $5,000 - $8,000\nTotal Estimated Budget: $68,000 - $90,000",
  },
  {
    id: "8",
    title: " Deliverables",
    content:
      "1. Complete source code\n2. Technical documentation\n3. User manual\n4. API documentation\n5. Database schema\n6. Deployment scripts\n7. Testing reports\n8. Training materials",
  },
];

// Random-ish assistant replies used to simulate a chat conversation
export const mockAiResponses: string[] = [
  "I've updated the specification based on your feedback. Let me know if you need any further adjustments.",
  "Great suggestion! I'll refine the technical requirements to include that.",
  "I've added user authentication as a priority requirement. The updated specification now includes detailed security measures.",
  "The project scope has been expanded to include the additional features you requested.",
  "I've optimized the budget breakdown and timeline to better reflect the project requirements.",
];

// Quick-reply suggestions shown under the chat input
export const suggestedPrompts: string[] = [
  "Add user authentication.",
  "Generate technical requirements.",
  "Improve the project scope.",
  "Reduce the budget.",
  "Rewrite professionally.",
  "Translate to French.",
];
