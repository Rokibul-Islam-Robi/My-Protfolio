document.addEventListener("DOMContentLoaded", () => {
  const achievements = [
    {
      id: 1,
      title: "Academic Writing for Research Excellence",
      image: "https://i.ibb.co.com/Pv7THJfH/1732207675915.jpg",
      description: `Hello folks! I am excited to share that I have recently attended an insightful workshop on 
            'Lecture Series-5: Academic Writing for Research Excellence", hosted by Daffodil International University Research Society (DIURS).
            <br><br>Session key topics:
            <ul>
                <li>Effective Paper Development</li>
                <li>Qsquare Approach</li>
                <li>Observation Researching in Bangladesh</li>
                <li>Critical Thinking in Research</li>
            </ul>`,
    },
    {
      id: 2,
      title: "Microsoft Fabric Data Analytics Training",
      image: "https://i.ibb.co.com/FbxGLKsn/1729876932255.jpg",
      description: `I have successfully completed the Data Analytics Engineering Training in Microsoft Fabric, an end-to-end, 
            cloud-based SaaS solution for data and analytics created by Microsoft and earned a Certificate of Excellence!
            <br><br>This learning journey has been an incredible opportunity to further my skills and gain hands-on experience.`,
    },
    {
      id: 3,
      title: "Cybersecurity Training in Critical Infrastructure Protection",
      image: "https://i.ibb.co.com/8g3ztwd1/1731188933492.jpg",
      description: `Hello folks! I am excited to share that I have successfully completed Cybersecurity training 
            in Critical Infrastructure Protection (ICIP) from OPSWAT Academy and earned a Certificate of Excellence!
            <br><br>Throughout this training, I gained valuable insights into the Cybersecurity process and protection techniques.`,
    },
  ];

  const achievementsContainer = document.querySelector(".achievements-section");
  const overlay = document.querySelector(".close-overlay");

  function renderAchievements() {
    achievementsContainer.innerHTML = ""; // Clear previous content

    achievements.forEach((achievement) => {
      const card = document.createElement("div");
      card.classList.add("achievement-card");
      card.dataset.id = achievement.id;

      card.innerHTML = `
                <img src="${achievement.image}" class="achievement-image" alt="${achievement.title}">
                <div class="achievement-content">
                    <h3 class="achievement-title">${achievement.title}</h3>
                    <p class="achievement-description">${achievement.description}</p>
                </div>
            `;

      card.addEventListener("click", () => toggleAchievement(card));
      achievementsContainer.appendChild(card);
    });
  }

  function toggleAchievement(card) {
    const isActive = card.classList.contains("expanded");
    document
      .querySelectorAll(".achievement-card")
      .forEach((c) => c.classList.remove("expanded"));

    if (!isActive) {
      card.classList.add("expanded");
      overlay.classList.add("active");
    } else {
      overlay.classList.remove("active");
    }
  }

  overlay.addEventListener("click", () => {
    document
      .querySelectorAll(".achievement-card")
      .forEach((c) => c.classList.remove("expanded"));
    overlay.classList.remove("active");
  });

  renderAchievements();
});

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(
    "Contact Form Responses"
  );

  var data = JSON.parse(e.postData.contents);
  var name = data.name;
  var email = data.email;
  var message = data.message;
  var timestamp = new Date();

  sheet.appendRow([name, email, message, timestamp]);

  return ContentService.createTextOutput(
    JSON.stringify({ status: "success" })
  ).setMimeType(ContentService.MimeType.JSON);
}

document
  .getElementById("contact-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let message = document.getElementById("message").value;

    fetch("YOUR_WEB_APP_URL_HERE", {
      method: "POST",
      body: JSON.stringify({ name: name, email: email, message: message }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          alert("Thank you for contacting me!");
          document.getElementById("contact-form").reset();
        } else {
          alert("Submission failed. Please try again.");
        }
      })
      .catch((error) => console.error("Error:", error));
  });
