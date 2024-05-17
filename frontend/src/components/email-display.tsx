// components/EmailDisplay.tsx
import React from "react";
import DOMPurify from "dompurify";
import parse from "html-react-parser";

interface EmailDisplayProps {
  htmlContent: string;
}

const EmailDisplay: React.FC<EmailDisplayProps> = ({ htmlContent }) => {
  return (
    <div
      className="email-content"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
};

export default EmailDisplay;
