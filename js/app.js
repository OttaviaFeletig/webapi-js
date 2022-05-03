// * FETCH API DATA

const getData = async () => {
  const base_URL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?";

  const userQuery = `q=${
    document.querySelector("#input-search-explore").value
  }`;

  const polarFocus = '&fq=glocations:("Arctic")';

  const queryPubYear = `&fq=pub_year:("${2022}")`;

  const queryNewsDesk = "";

  const apiKey = "&api-key=jbIYjBeDQwCAfrWak0psVqCGshuSaU2y";

  let fullURL = base_URL + userQuery + queryPubYear + apiKey;
  console.log("API request", fullURL);

  let response = await fetch(fullURL);
  let myData = await response.json();
  printResult(myData);
};

// * PRODUCE RESULT OF API QUERY

const printResult = (myData) => {
  clearDOM();
  createBSTable(myData);

  // ? Creating and appending card HTML:

  for (let i = 0; i < myData.response.docs.length; i++) {
    let resultContainerTag = document.querySelector(`#col-${i}`);

    let divCard = document.createElement("div");
    divCard.setAttribute("class", "card");
    divCard.setAttribute("style", "width: 17rem");
    resultContainerTag.appendChild(divCard);

    let imgTag = document.createElement("img");
    imgTag.setAttribute("class", "card-img-top");
    imgTag.setAttribute("id", `api-img-${i}`);
    divCard.appendChild(imgTag);

    let divCardBody = document.createElement("div");
    divCardBody.setAttribute("class", "card-body");
    divCard.appendChild(divCardBody);

    let titleTag = document.createElement("h5");
    titleTag.setAttribute("class", "card-title");
    titleTag.setAttribute("id", `api-title-${i}`);
    divCardBody.appendChild(titleTag);

    let textTag = document.createElement("p");
    textTag.setAttribute("class", "card-text");
    divCardBody.appendChild(textTag);

    let bylineTag = document.createElement("span");
    bylineTag.setAttribute("id", `api-byline-${i}`);
    textTag.appendChild(bylineTag);

    let lineBreakTag = document.createElement("br");
    textTag.appendChild(lineBreakTag);

    let dateTag = document.createElement("span");
    dateTag.setAttribute("id", `api-date-${i}`);
    dateTag.setAttribute("class", "font-grey");
    textTag.appendChild(dateTag);

    let sectionTag = document.createElement("span");
    sectionTag.setAttribute("id", `api-section-${i}`);
    sectionTag.setAttribute("class", "font-grey");
    textTag.appendChild(sectionTag);

    let abstractTag = document.createElement("p");
    abstractTag.setAttribute("id", `api-abstract-${i}`);
    abstractTag.setAttribute("class", "abstract-margin-top");
    textTag.appendChild(abstractTag);

    // ? Filling out the card:

    document.querySelector(`#api-title-${i}`).textContent =
      myData.response.docs[i].headline.main;

    document.querySelector(`#api-byline-${i}`).textContent =
      myData.response.docs[i].byline.original;

    document.querySelector(`#api-abstract-${i}`).textContent =
      myData.response.docs[i].abstract;

    articlePubdate = new Date(
      myData.response.docs[i].pub_date
    ).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    document.querySelector(`#api-date-${i}`).textContent = articlePubdate;

    document.querySelector(
      `#api-section-${i}`
    ).textContent = `, ${myData.response.docs[i].news_desk}`;

    // ? Error handling for empty multimedia json arrays
    if (myData.response.docs[i].multimedia.length === 0) {
      document
        .querySelector(`#api-img-${i}`)
        .setAttribute(
          "src",
          "https://images.unsplash.com/photo-1600170885301-7a7fc8ffb5a3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
        );
    } else {
      document
        .querySelector(`#api-img-${i}`)
        .setAttribute(
          "src",
          `https://static01.nyt.com/${myData.response.docs[i].multimedia[0].url}`
        );
    }
  }
};

// * FUNCTION TO CREATE BOOTSTRAP TABLE

const createBSTable = (myData) => {
  let resultContainerTag = document.querySelector("#result-container");

  let rowTag = document.createElement("div");
  rowTag.setAttribute("class", "row");
  resultContainerTag.appendChild(rowTag);

  for (let i = 0; i < myData.response.docs.length; i++) {
    let colTag = document.createElement("div");
    colTag.setAttribute("class", "col mb-3");
    colTag.setAttribute("id", `col-${i}`);
    rowTag.appendChild(colTag);
  }
};

// * FUNCTION TO CLEAR DOM

const clearDOM = () => {
  document.querySelector("#result-container").innerHTML = "";
};

// * CONTROL PANEL SEARCH BUTTON FUNCTIONALITY

document
  .querySelector("#explore-search-btn")
  .addEventListener("click", () => getData());
getData();

document
  .querySelector("#input-search-explore")
  .addEventListener("keyup", (event) => {
    if (event.code == "Enter") {
      getData();
    } else return;
  });

// TODO: DISABLE REGION DROPDOWN WHEN ANTARCTICA SELECTED

/* let antarcticaRadio = document.querySelector("#inputRadioAntarctica");
antarcticaRadio.addEventListener("click", () => {
  if (antarcticaRadio.checked) {
    document.querySelector("#inputRegion").disabled = true;
  }
}); */
