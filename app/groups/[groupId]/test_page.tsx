import { render, screen, fireEvent } from "@testing-library/react";
import GroupPage from "./page";

describe("GroupPage", () => {
  test("renders group name", () => {
    render(<GroupPage params={{ groupId: "1" }} />);
    const groupNameElement = screen.getByText(/Group Name/i);
    expect(groupNameElement).toBeInTheDocument();
  });

  test("renders join button", () => {
    render(<GroupPage params={{ groupId: "1" }} />);
    const joinButton = screen.getByText(/Join/i);
    expect(joinButton).toBeInTheDocument();
  });

  test("renders create post button", () => {
    render(<GroupPage params={{ groupId: "1" }} />);
    const createPostButton = screen.getByText(/Create Post/i);
    expect(createPostButton).toBeInTheDocument();
  });

  test("clicking create post button shows new post form", () => {
    render(<GroupPage params={{ groupId: "1" }} />);
    const createPostButton = screen.getByText(/Create Post/i);
    fireEvent.click(createPostButton);
    const newPostForm = screen.getByTestId("new-post-form");
    expect(newPostForm).toBeInTheDocument();
  });

  test("renders group description", () => {
    render(<GroupPage params={{ groupId: "1" }} />);
    const groupDescription = screen.getByText(/Group Description/i);
    expect(groupDescription).toBeInTheDocument();
  });
});