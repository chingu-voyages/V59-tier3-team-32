import AuthDialog from "@/app/(main)/_Header/AuthDialog";
import "@testing-library/jest-dom/vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  replace: vi.fn(),
  social: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    replace: mocks.replace,
  }),
}));

vi.mock("@/lib/auth-client", () => ({
  signIn: {
    social: mocks.social,
  },
}));

vi.mock("@/components/ui/dialog", () => ({
  Dialog: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  DialogTrigger: ({ children }: { children: React.ReactNode }) => (
    <button>{children}</button>
  ),
  DialogContent: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  DialogHeader: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  DialogTitle: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

describe("AuthDialog", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    Object.defineProperty(window, "location", {
      value: { origin: "http://localhost" },
      writable: true,
    });
  });

  it("renders login text after opening dialog", async () => {
    render(<AuthDialog authType="login">Open Auth </AuthDialog>);

    await userEvent.click(
      screen.getAllByRole("button", { name: /open auth/i })[0],
    );

    expect(await screen.findByText("Sign in")).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /sign in with github/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /sign in with google/i }),
    ).toBeInTheDocument();
  });

  it("calls github and redirects on success", async () => {
    mocks.social.mockImplementation((_data, { onSuccess }) => {
      onSuccess();
      return Promise.resolve();
    });

    render(
      <AuthDialog authType="login">
        <span aria-label="open-auth-dialog">Open Auth</span>
      </AuthDialog>,
    );

    await userEvent.click(screen.getByLabelText("open-auth-dialog"));

    const githubButton = screen.getAllByRole("button", {
      name: /sign in with github/i,
    })[0];

    await userEvent.click(githubButton);

    await waitFor(() => {
      expect(mocks.social).toHaveBeenCalledTimes(1);
      expect(mocks.social).toHaveBeenCalledWith(
        expect.objectContaining({ provider: "github" }),
        expect.objectContaining({
          onSuccess: expect.any(Function),
          onError: expect.any(Function),
        }),
      );
      expect(mocks.replace).toHaveBeenCalledWith("/roles");
    });
  });

  it("redirects to home on error", async () => {
    mocks.social.mockImplementation((_data, { onError }) => {
      onError();
      return Promise.resolve();
    });

    render(
      <AuthDialog authType="login">
        <span aria-label="open-auth-dialog">Open Auth</span>
      </AuthDialog>,
    );

    const googleButton = screen.getAllByRole("button", {
      name: /sign in with google/i,
    })[0];

    await userEvent.click(googleButton);

    await waitFor(() => {
      expect(mocks.social).toHaveBeenCalledTimes(1);
      expect(mocks.social).toHaveBeenCalledWith(
        expect.objectContaining({ provider: "google" }),
        expect.objectContaining({
          onSuccess: expect.any(Function),
          onError: expect.any(Function),
        }),
      );

      expect(mocks.replace).toHaveBeenCalledWith("/");
    });
  });
});
