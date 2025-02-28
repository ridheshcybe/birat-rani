document.getElementById("sub").onclick = () => {
  const name = document.getElementById("name").value;
  const subject = document.getElementById("subject").value;
  const message = document.getElementById("message").value;
  window.open(
    `mailto:walavalkarridhesh@gmail.com?subject=${name}-${subject}-WEB_EMAIL&body=${message}`
  );
};
