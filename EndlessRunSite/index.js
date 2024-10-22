const students = [
    {
      name: "Daniel Tomazi",
      pic: "assets/foto-tomazi.png",
      uri: "https://www.linkedin.com/in/daniel-tomazi"
    },
    {
      name: "Cynthia Ribamar",
      pic: "assets/foto-cynthia.png",
      uri: "https://www.linkedin.com/in/cynthia-ribamar-40b9211b7/"
    },
    {
      name: "Marcio Galvão",
      pic: "assets/foto-marcio.png",
      uri: "https://www.linkedin.com/in/m%C3%A1rcio-galv%C3%A3o-5a7270272"
    },
    {
      name: "Paulo Henrique",
      pic: "assets/foto-paulo.png",
      uri: "https://www.linkedin.com/in/paulofronthenrique"
    },
    {
      name: "Vitor Carvalho",
      pic: "assets/foto-vitor.png",
      uri: "https://www.linkedin.com/in/vitor-macedo-7884b8271/"
    }
  ]

  window.onload = function loadList() {
    const list = document.getElementById("students");
    console.log(list)

    students.forEach((student, index) => {
        const li = document.createElement("li");
        li.setAttribute("class", "student");
        li.setAttribute("key", index);

        const link = document.createElement("a");
        link.setAttribute("href", student.uri);

        link.setAttribute("href", student.uri);

        const img = document.createElement("img");
        img.setAttribute("src", student.pic);
        img.setAttribute("class", "pic");
        img.setAttribute("alt", `Foto do(a) estudante ${student.name}`);
        img.setAttribute("title", student.name);

        li.appendChild(img);
        li.appendChild(link)
        list.appendChild(li);
    })
  }
