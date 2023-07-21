import React from "react";
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from "react-router-dom";
import AnnouncementBar from "../../../components/AnnouncementBar/AnnouncementBar";

describe('unit test for AnnouncementBar', () => {

  test('Header renders correctly', () => {
    render(
      <MemoryRouter>
        <AnnouncementBar />
      </MemoryRouter>
    );

    const announcementCloseButton = screen.getByAltText("close button");
    expect(announcementCloseButton).toBeInTheDocument();

    const announcementText = screen.getByText("Update: We have added the necessary feature that does ____.");
    expect(announcementText).toBeInTheDocument();
  });
});