import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";

import App from "../App";

function renderApp(initialRoute = "/") {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={[initialRoute]}>
        <App />
      </MemoryRouter>
    </QueryClientProvider>
  );
}

describe("App routing", () => {
  it("affiche le dashboard sur la route racine", () => {
    renderApp("/");
    expect(screen.getByText(/vos projets/i)).toBeInTheDocument();
  });

  it("affiche la page de connexion sur /login", () => {
    renderApp("/login");
    expect(screen.getByText(/connexion a clausio/i)).toBeInTheDocument();
  });
});
