const form = document.getElementById("applyForm");
const statusEl = document.getElementById("status");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  statusEl.textContent = "Submitting...";

  const data = new FormData(form);

  const file = data.get("cv");
  const allowedTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ];

  if (!file || !allowedTypes.includes(file.type)) {
    statusEl.textContent = "Please upload a PDF or Word document.";
    return;
  }

  try {
    const response = await fetch("/api/submit", {
      method: "POST",
      body: data
    });

    if (!response.ok) {
      throw new Error("Submission failed");
    }

    const result = await response.json();
    statusEl.textContent = `Application submitted successfully (ID ${result.candidateId})`;
    form.reset();
  } catch (err) {
    statusEl.textContent = "Error submitting application.";
  }
});
