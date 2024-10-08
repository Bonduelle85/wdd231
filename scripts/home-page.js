const courses = [
  {
    subject: "CSE",
    number: 110,
    title: "Introduction to Programming",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.",
    technology: ["Python"],
    completed: true,
  },
  {
    subject: "WDD",
    number: 130,
    title: "Web Fundamentals",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.",
    technology: ["HTML", "CSS"],
    completed: true,
  },
  {
    subject: "CSE",
    number: 111,
    title: "Programming with Functions",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.",
    technology: ["Python"],
    completed: true,
  },
  {
    subject: "CSE",
    number: 210,
    title: "Programming with Classes",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.",
    technology: ["C#"],
    completed: true,
  },
  {
    subject: "WDD",
    number: 131,
    title: "Dynamic Web Fundamentals",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.",
    technology: ["HTML", "CSS", "JavaScript"],
    completed: true,
  },
  {
    subject: "WDD",
    number: 231,
    title: "Frontend Web Development I",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.",
    technology: ["HTML", "CSS", "JavaScript"],
    completed: false,
  },
];

const root = document.querySelector(":root");
let completedCourses = courses.filter((course) => course.completed);
let completedCoursesContentList = completedCourses.map(
  (course) => `${course.subject} ${course.number}`
);

// Total number of credits required
let totalCredits = courses.reduce((sum, course) => sum + course.credits, 0);
document.querySelector("#credits-required").innerHTML = totalCredits;

// Buttons and EventListeners
document.querySelector("#all").addEventListener("click", () => {
  setCourseItemsBackgroundInitial();
  document.querySelectorAll(".course-item").forEach((item) => {
    setCourseItemsBackground(item);
  });
});

document.querySelector("#cse").addEventListener("click", () => {
  setCourseItemsBackgroundInitial();
  document.querySelectorAll(".cse").forEach((item) => {
    setCourseItemsBackground(item);
  });
});

document.querySelector("#wdd").addEventListener("click", () => {
  setCourseItemsBackgroundInitial();
  document.querySelectorAll(".wdd").forEach((item) => {
    setCourseItemsBackground(item);
  });
});

function setCourseItemsBackgroundInitial() {
  document.querySelectorAll(".course-item").forEach((item) => {
    let color = getComputedStyle(root)
      .getPropertyValue("--uncompleted-color")
      .trim();
    item.style.backgroundColor = color;
  });
}

function setCourseItemsBackground(item) {
  let content = item.textContent;
  let color = getComputedStyle(root)
    .getPropertyValue("--completed-color")
    .trim();
  if (completedCoursesContentList.includes(content))
    item.style.backgroundColor = color;
}

// Footer
document.querySelector(
  "#current-year"
).innerHTML = `&copy ${new Date().getFullYear()}`;
document.querySelector(
  "#last-modified"
).innerHTML = `Last Update: ${document.lastModified}`;

// Burger
const hamButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#animation");

hamButton.addEventListener("click", () => {
  navigation.classList.toggle("open");
  hamButton.classList.toggle("open");
});

// Dialog
const courseDialog = document.querySelector("#course-dialog");

document.querySelectorAll(".course-item").forEach((item) => {
  item.addEventListener("click", () => {
    let courseName = item.textContent;
    let [subject, number] = courseName.split(" ");
    let course = courses.find(
      (course) =>
        course.subject === subject && course.number.toString() === number
    );
    showCourseDialog(course);
  });
});

function showCourseDialog(course) {
  courseDialog.innerHTML = `
    <h3 id="dialog-number">${course.subject} ${course.number}</h3>
    <h4 id="dialog-title">${course.title}</h4>
    <p id="dialog-credits">${course.credits} credits</p>
    <p id="dialog-cert"><b>Certificate</b>: ${course.certificate}</p>
    <p id="dialog-desc">${course.description}</p>
    <p id="dialog-tech"><b>Technology</b>: ${course.technology}</p>
    <button id="dialog-close" type="reset">&#10060;</button>
  `;
  let closeDialogButton = document.querySelector("#dialog-close");
  closeDialogButton.addEventListener("click", () => {
    courseDialog.close();
  });
  courseDialog.showModal();
}

// initial state - all
setCourseItemsBackgroundInitial();
document.querySelectorAll(".course-item").forEach((item) => {
  setCourseItemsBackground(item);
});
