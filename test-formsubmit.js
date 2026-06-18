const payload = {
  _subject: `New Partner Application: Test Canteen - Test Owner`,
  _captcha: "false",
  _template: "table",
  Name: "Test Owner",
  Phone: "9876543210",
  email: "test@example.com",
  "Canteen Name": "Test Canteen",
  "College Name": "Test College",
  City: "Test City",
  Outlets: "1",
  "Daily Orders": "50-150"
};

fetch("https://formsubmit.co/ajax/tamiltamilboss090@gmail.com", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
  body: JSON.stringify(payload)
})
.then(res => res.json().then(data => ({status: res.status, data})))
.then(console.log)
.catch(console.error);
