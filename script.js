const $d = document;

const gallery = $d.getElementById("gallery");

let filterActive = 0;

let dataGallery = [];

function selectFilter(index) {
  gallery.innerHTML = "";
  const filters = Array.from($d.querySelectorAll(".list_years button"));
  if (filters.length) {
    filters[filterActive].classList = "";
    filters[index].classList.add("active");
    filterActive = index;
    const { months } = dataGallery[index];
    const photos = months.reduce(
      (acc, cur) =>
        (acc += `
  <article>
  <div class="month">
    <span>${cur.name}</span>
  </div>
  <div class="gallery">
    <button id="arrow_left">
      <img
        src="https://develop.viviendasyvalores.com.co/componentes/vyv-inm-detail/assets/icons/Flecha_positivo.svg"
        alt="Arrow icon"
      />
    </button>
    <section id="gallery_modal">
      ${printPhotos(cur.photos)}
    </section>
    <button id="arrow_right">
      <img
        src="https://develop.viviendasyvalores.com.co/componentes/vyv-inm-detail/assets/icons/Flecha_positivo.svg"
        alt="Arrow icon"
      />
    </button>
  </div>
</article>
  `),
      ""
    );
    gallery.innerHTML = photos;
  }
}

function printPhotos(data) {
  return data.reduce(
    (acc, cur, i) =>
      (acc += `
  <article>
        <img
          src="${cur}"
          alt="Foto ${i + 1}"
        />
      </article>
  `),
    ""
  );
}

window.addEventListener("DOMContentLoaded", () => {
  const baseurl =
    "https://develop.viviendasyvalores.com.co/componentes/vyv-avance/endpoints";
  let index = 0;

  let articles = [];

  const modal = $d.querySelector(".modal");

  const titleModal = $d.getElementById("title_modal");
  const filter_years = $d.getElementById("filter_years");
  const photoModal = $d.getElementById("blog_photo");

  const title = $d.getElementById("title_modal");

  // btnLeft.addEventListener("click", () => {
  //   if (index > 0) {
  //     index--;
  //     move(index);
  //   }
  // });

  // btnRight.addEventListener("click", () => {
  //   if (index < articles.length - 1) {
  //     index++;
  //     move(index);
  //   }
  // });

  // const move = (index) => {
  //   articles[index].scrollIntoView({
  //     behavior: "smooth",
  //     block: "start",
  //     inline: "start",
  //   });
  // };

  const send_request = async (url) => {
    let response = await fetch(url, {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-type": "aplication/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
    });
    response = await response.json();
    return response;
  };

  const getElements = (h4, values) => {
    const element = h4.nextElementSibling;
    if (!element) {
      return values;
    }
    if (element.tagName === "H4") {
      return values;
    }
    if (element.tagName === "H6") {
      values = [...values, { name: element.textContent, photos: [] }];
    }
    if (element.tagName === "A") {
      values[values.length - 1].photos = [
        ...values[values.length - 1].photos,
        element.href,
      ];
    }
    return getElements(element, values);
  };

  const getInfo = (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    const h4 = Array.from(doc.querySelectorAll("H4"));

    let data = [];

    h4.forEach((x) => {
      const info = {
        year: x.textContent,
        months: getElements(x, []),
      };
      data = [...data, info];
    });

    return data;
  };

  modal.addEventListener("shown.bs.modal", async () => {
    const post = modal.getAttribute("data-post");
    // const { progress } = await send_request(
    //   `${baseurl}/get_gallery.php?post_parent=${post}`
    // );
    const progress = {
      title: "Callejas",
      content: `<style>
      /*! elementor - v3.12.1 - 02-04-2023 */
      .elementor-heading-title {
        padding: 0;
        margin: 0;
        line-height: 1;
      }
      .elementor-widget-heading
        .elementor-heading-title[class*="elementor-size-"]
        > a {
        color: inherit;
        font-size: inherit;
        line-height: inherit;
      }
      .elementor-widget-heading .elementor-heading-title.elementor-size-small {
        font-size: 15px;
      }
      .elementor-widget-heading .elementor-heading-title.elementor-size-medium {
        font-size: 19px;
      }
      .elementor-widget-heading .elementor-heading-title.elementor-size-large {
        font-size: 29px;
      }
      .elementor-widget-heading .elementor-heading-title.elementor-size-xl {
        font-size: 39px;
      }
      .elementor-widget-heading .elementor-heading-title.elementor-size-xxl {
        font-size: 59px;
      }
    </style>
    <h4>2023</h4>
    <h6>MARZO</h6>
    <style>
      /*! elementor-pro - v3.12.2 - 09-04-2023 */
      .elementor-gallery__container {
        min-height: 1px;
      }
      .elementor-gallery-item {
        position: relative;
        overflow: hidden;
        display: block;
        text-decoration: none;
        border: solid var(--image-border-width) var(--image-border-color);
        border-radius: var(--image-border-radius);
      }
      .elementor-gallery-item__content,
      .elementor-gallery-item__overlay {
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
      }
      .elementor-gallery-item__overlay {
        mix-blend-mode: var(--overlay-mix-blend-mode);
        transition-duration: var(--overlay-transition-duration);
        transition-property: mix-blend-mode, transform, opacity, background-color;
      }
      .elementor-gallery-item__image.e-gallery-image {
        transition-duration: var(--image-transition-duration);
        transition-property: filter, transform;
      }
      .elementor-gallery-item__content {
        display: flex;
        flex-direction: column;
        justify-content: var(--content-justify-content, center);
        align-items: center;
        text-align: var(--content-text-align);
        padding: var(--content-padding);
      }
      .elementor-gallery-item__content > div {
        transition-duration: var(--content-transition-duration);
      }
      .elementor-gallery-item__content.elementor-gallery--sequenced-animation
        > div:nth-child(2) {
        transition-delay: calc(var(--content-transition-delay) / 3);
      }
      .elementor-gallery-item__content.elementor-gallery--sequenced-animation
        > div:nth-child(3) {
        transition-delay: calc(var(--content-transition-delay) / 3 * 2);
      }
      .elementor-gallery-item__content.elementor-gallery--sequenced-animation
        > div:nth-child(4) {
        transition-delay: calc(var(--content-transition-delay) / 3 * 3);
      }
      .elementor-gallery-item__description {
        color: var(--description-text-color, #fff);
        width: 100%;
      }
      .elementor-gallery-item__title {
        color: var(--title-text-color, #fff);
        font-weight: 700;
        width: 100%;
      }
      .elementor-gallery__titles-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: var(--titles-container-justify-content, center);
        margin-bottom: 20px;
      }
      .elementor-gallery__titles-container:not(.e--pointer-framed)
        .elementor-item:after,
      .elementor-gallery__titles-container:not(.e--pointer-framed)
        .elementor-item:before {
        background-color: var(--galleries-pointer-bg-color-hover);
      }
      .elementor-gallery__titles-container:not(.e--pointer-framed)
        .elementor-item.elementor-item-active:after,
      .elementor-gallery__titles-container:not(.e--pointer-framed)
        .elementor-item.elementor-item-active:before {
        background-color: var(--galleries-pointer-bg-color-active);
      }
      .elementor-gallery__titles-container.e--pointer-framed
        .elementor-item:before {
        border-color: var(--galleries-pointer-bg-color-hover);
        border-width: var(--galleries-pointer-border-width);
      }
      .elementor-gallery__titles-container.e--pointer-framed .elementor-item:after {
        border-color: var(--galleries-pointer-bg-color-hover);
      }
      .elementor-gallery__titles-container.e--pointer-framed
        .elementor-item.elementor-item-active:after,
      .elementor-gallery__titles-container.e--pointer-framed
        .elementor-item.elementor-item-active:before {
        border-color: var(--galleries-pointer-bg-color-active);
      }
      .elementor-gallery__titles-container.e--pointer-framed.e--animation-draw
        .elementor-item:before {
        border-left-width: var(--galleries-pointer-border-width);
        border-bottom-width: var(--galleries-pointer-border-width);
        border-right-width: 0;
        border-top-width: 0;
      }
      .elementor-gallery__titles-container.e--pointer-framed.e--animation-draw
        .elementor-item:after {
        border-left-width: 0;
        border-bottom-width: 0;
        border-right-width: var(--galleries-pointer-border-width);
        border-top-width: var(--galleries-pointer-border-width);
      }
      .elementor-gallery__titles-container.e--pointer-framed.e--animation-corners
        .elementor-item:before {
        border-left-width: var(--galleries-pointer-border-width);
        border-bottom-width: 0;
        border-right-width: 0;
        border-top-width: var(--galleries-pointer-border-width);
      }
      .elementor-gallery__titles-container.e--pointer-framed.e--animation-corners
        .elementor-item:after {
        border-left-width: 0;
        border-bottom-width: var(--galleries-pointer-border-width);
        border-right-width: var(--galleries-pointer-border-width);
        border-top-width: 0;
      }
      .elementor-gallery__titles-container
        .e--pointer-double-line
        .elementor-item:after,
      .elementor-gallery__titles-container
        .e--pointer-double-line
        .elementor-item:before,
      .elementor-gallery__titles-container
        .e--pointer-overline
        .elementor-item:before,
      .elementor-gallery__titles-container
        .e--pointer-underline
        .elementor-item:after {
        height: var(--galleries-pointer-border-width);
      }
      .elementor-gallery-title {
        --space-between: 10px;
        cursor: pointer;
        color: #6d7882;
        font-weight: 500;
        position: relative;
        padding: 7px 14px;
        transition: all 0.3s;
      }
      .elementor-gallery-title--active {
        color: #495157;
      }
      .elementor-gallery-title:not(:last-child) {
        margin-right: var(--space-between);
      }
      .elementor-gallery-item__title + .elementor-gallery-item__description {
        margin-top: var(--description-margin-top);
      }
      .e-gallery-item.elementor-gallery-item {
        transition-property: all;
      }
      .e-gallery-item.elementor-animated-content
        .elementor-animated-item--enter-from-bottom,
      .e-gallery-item.elementor-animated-content
        .elementor-animated-item--enter-from-left,
      .e-gallery-item.elementor-animated-content
        .elementor-animated-item--enter-from-right,
      .e-gallery-item.elementor-animated-content
        .elementor-animated-item--enter-from-top,
      .e-gallery-item:hover .elementor-gallery__item-overlay-bg,
      .e-gallery-item:hover .elementor-gallery__item-overlay-content,
      .e-gallery-item:hover .elementor-gallery__item-overlay-content__description,
      .e-gallery-item:hover .elementor-gallery__item-overlay-content__title {
        opacity: 1;
      }
      a.elementor-item.elementor-gallery-title {
        color: var(--galleries-title-color-normal);
      }
      a.elementor-item.elementor-gallery-title.elementor-item-active,
      a.elementor-item.elementor-gallery-title.highlighted,
      a.elementor-item.elementor-gallery-title:focus,
      a.elementor-item.elementor-gallery-title:hover {
        color: var(--galleries-title-color-hover);
      }
      a.elementor-item.elementor-gallery-title.elementor-item-active {
        color: var(--gallery-title-color-active);
      }
      .e-con-inner > .elementor-widget-gallery,
      .e-con > .elementor-widget-gallery {
        width: var(--container-widget-width);
        --flex-grow: var(--container-widget-flex-grow);
      }
    </style>
    <a
      href="https://develop.viviendasyvalores.com.co/wp-content/uploads/2022/05/AVANCE-CALLEJAS-MAYO-1.jpg"
      data-elementor-open-lightbox="yes"
      data-elementor-lightbox-slideshow="all-dec7ec7"
      data-elementor-lightbox-title="AVANCE CALLEJAS MAYO (1)"
      data-e-action-hash="#elementor-action%3Aaction%3Dlightbox%26settings%3DeyJpZCI6OTI2MDMsInVybCI6Imh0dHBzOlwvXC9kZXZlbG9wLnZpdmllbmRhc3l2YWxvcmVzLmNvbS5jb1wvd3AtY29udGVudFwvdXBsb2Fkc1wvMjAyMlwvMDVcL0FWQU5DRS1DQUxMRUpBUy1NQVlPLTEuanBnIiwic2xpZGVzaG93IjoiYWxsLWRlYzdlYzcifQ%3D%3D"
    >
    </a>
    <a
      href="https://develop.viviendasyvalores.com.co/wp-content/uploads/2022/05/AVANCE-CALLEJAS-MAYO-2.jpg"
      data-elementor-open-lightbox="yes"
      data-elementor-lightbox-slideshow="all-dec7ec7"
      data-elementor-lightbox-title="AVANCE CALLEJAS MAYO (2)"
      data-e-action-hash="#elementor-action%3Aaction%3Dlightbox%26settings%3DeyJpZCI6OTI2MDQsInVybCI6Imh0dHBzOlwvXC9kZXZlbG9wLnZpdmllbmRhc3l2YWxvcmVzLmNvbS5jb1wvd3AtY29udGVudFwvdXBsb2Fkc1wvMjAyMlwvMDVcL0FWQU5DRS1DQUxMRUpBUy1NQVlPLTIuanBnIiwic2xpZGVzaG93IjoiYWxsLWRlYzdlYzcifQ%3D%3D"
    >
    </a>
    <a
      href="https://develop.viviendasyvalores.com.co/wp-content/uploads/2022/05/AVANCE-CALLEJAS-MAYO-3.jpg"
      data-elementor-open-lightbox="yes"
      data-elementor-lightbox-slideshow="all-dec7ec7"
      data-elementor-lightbox-title="AVANCE CALLEJAS MAYO (3)"
      data-e-action-hash="#elementor-action%3Aaction%3Dlightbox%26settings%3DeyJpZCI6OTI2MDUsInVybCI6Imh0dHBzOlwvXC9kZXZlbG9wLnZpdmllbmRhc3l2YWxvcmVzLmNvbS5jb1wvd3AtY29udGVudFwvdXBsb2Fkc1wvMjAyMlwvMDVcL0FWQU5DRS1DQUxMRUpBUy1NQVlPLTMuanBnIiwic2xpZGVzaG93IjoiYWxsLWRlYzdlYzcifQ%3D%3D"
    >
    </a>
    <a
      href="https://develop.viviendasyvalores.com.co/wp-content/uploads/2022/05/AVANCE-CALLEJAS-MAYO-4.jpg"
      data-elementor-open-lightbox="yes"
      data-elementor-lightbox-slideshow="all-dec7ec7"
      data-elementor-lightbox-title="AVANCE CALLEJAS MAYO (4)"
      data-e-action-hash="#elementor-action%3Aaction%3Dlightbox%26settings%3DeyJpZCI6OTI2MDYsInVybCI6Imh0dHBzOlwvXC9kZXZlbG9wLnZpdmllbmRhc3l2YWxvcmVzLmNvbS5jb1wvd3AtY29udGVudFwvdXBsb2Fkc1wvMjAyMlwvMDVcL0FWQU5DRS1DQUxMRUpBUy1NQVlPLTQuanBnIiwic2xpZGVzaG93IjoiYWxsLWRlYzdlYzcifQ%3D%3D"
    >
    </a>
    <h6>ENERO</h6>
    <a
      href="https://develop.viviendasyvalores.com.co/wp-content/uploads/2022/05/AVANCE-CALLEJAS-TORRES-ABRIL-2022-4.jpg"
      data-elementor-open-lightbox="yes"
      data-elementor-lightbox-slideshow="all-9225a64"
      data-elementor-lightbox-title="AVANCE CALLEJAS TORRES ABRIL 2022 (4)"
      data-e-action-hash="#elementor-action%3Aaction%3Dlightbox%26settings%3DeyJpZCI6ODkxNTcsInVybCI6Imh0dHBzOlwvXC9kZXZlbG9wLnZpdmllbmRhc3l2YWxvcmVzLmNvbS5jb1wvd3AtY29udGVudFwvdXBsb2Fkc1wvMjAyMlwvMDVcL0FWQU5DRS1DQUxMRUpBUy1UT1JSRVMtQUJSSUwtMjAyMi00LmpwZyIsInNsaWRlc2hvdyI6ImFsbC05MjI1YTY0In0%3D"
    >
    </a>
    <a
      href="https://develop.viviendasyvalores.com.co/wp-content/uploads/2022/05/AVANCE-CALLEJAS-TORRES-ABRIL-2022-3.jpg"
      data-elementor-open-lightbox="yes"
      data-elementor-lightbox-slideshow="all-9225a64"
      data-elementor-lightbox-title="AVANCE CALLEJAS TORRES ABRIL 2022 (3)"
      data-e-action-hash="#elementor-action%3Aaction%3Dlightbox%26settings%3DeyJpZCI6ODkxNTYsInVybCI6Imh0dHBzOlwvXC9kZXZlbG9wLnZpdmllbmRhc3l2YWxvcmVzLmNvbS5jb1wvd3AtY29udGVudFwvdXBsb2Fkc1wvMjAyMlwvMDVcL0FWQU5DRS1DQUxMRUpBUy1UT1JSRVMtQUJSSUwtMjAyMi0zLmpwZyIsInNsaWRlc2hvdyI6ImFsbC05MjI1YTY0In0%3D"
    >
    </a>
    <a
      href="https://develop.viviendasyvalores.com.co/wp-content/uploads/2022/05/AVANCE-CALLEJAS-TORRES-ABRIL-2022-2.jpg"
      data-elementor-open-lightbox="yes"
      data-elementor-lightbox-slideshow="all-9225a64"
      data-elementor-lightbox-title="AVANCE CALLEJAS TORRES ABRIL 2022 (2)"
      data-e-action-hash="#elementor-action%3Aaction%3Dlightbox%26settings%3DeyJpZCI6ODkxNTUsInVybCI6Imh0dHBzOlwvXC9kZXZlbG9wLnZpdmllbmRhc3l2YWxvcmVzLmNvbS5jb1wvd3AtY29udGVudFwvdXBsb2Fkc1wvMjAyMlwvMDVcL0FWQU5DRS1DQUxMRUpBUy1UT1JSRVMtQUJSSUwtMjAyMi0yLmpwZyIsInNsaWRlc2hvdyI6ImFsbC05MjI1YTY0In0%3D"
    >
    </a>
    <a
      href="https://develop.viviendasyvalores.com.co/wp-content/uploads/2022/05/AVANCE-CALLEJAS-TORRES-ABRIL-2022-1.jpg"
      data-elementor-open-lightbox="yes"
      data-elementor-lightbox-slideshow="all-9225a64"
      data-elementor-lightbox-title="AVANCE CALLEJAS TORRES ABRIL 2022 (1)"
      data-e-action-hash="#elementor-action%3Aaction%3Dlightbox%26settings%3DeyJpZCI6ODkxNTQsInVybCI6Imh0dHBzOlwvXC9kZXZlbG9wLnZpdmllbmRhc3l2YWxvcmVzLmNvbS5jb1wvd3AtY29udGVudFwvdXBsb2Fkc1wvMjAyMlwvMDVcL0FWQU5DRS1DQUxMRUpBUy1UT1JSRVMtQUJSSUwtMjAyMi0xLmpwZyIsInNsaWRlc2hvdyI6ImFsbC05MjI1YTY0In0%3D"
    >
    </a>
    <h4>2022</h4>
    <h6>MAYO</h6>
    <a
      href="https://develop.viviendasyvalores.com.co/wp-content/uploads/2022/05/AVANCE-CALLEJAS-MAYO-1.jpg"
      data-elementor-open-lightbox="yes"
      data-elementor-lightbox-slideshow="all-d31f15e"
      data-elementor-lightbox-title="AVANCE CALLEJAS MAYO (1)"
      data-e-action-hash="#elementor-action%3Aaction%3Dlightbox%26settings%3DeyJpZCI6OTI2MDMsInVybCI6Imh0dHBzOlwvXC9kZXZlbG9wLnZpdmllbmRhc3l2YWxvcmVzLmNvbS5jb1wvd3AtY29udGVudFwvdXBsb2Fkc1wvMjAyMlwvMDVcL0FWQU5DRS1DQUxMRUpBUy1NQVlPLTEuanBnIiwic2xpZGVzaG93IjoiYWxsLWQzMWYxNWUifQ%3D%3D"
    >
    </a>
    <a
      href="https://develop.viviendasyvalores.com.co/wp-content/uploads/2022/05/AVANCE-CALLEJAS-MAYO-2.jpg"
      data-elementor-open-lightbox="yes"
      data-elementor-lightbox-slideshow="all-d31f15e"
      data-elementor-lightbox-title="AVANCE CALLEJAS MAYO (2)"
      data-e-action-hash="#elementor-action%3Aaction%3Dlightbox%26settings%3DeyJpZCI6OTI2MDQsInVybCI6Imh0dHBzOlwvXC9kZXZlbG9wLnZpdmllbmRhc3l2YWxvcmVzLmNvbS5jb1wvd3AtY29udGVudFwvdXBsb2Fkc1wvMjAyMlwvMDVcL0FWQU5DRS1DQUxMRUpBUy1NQVlPLTIuanBnIiwic2xpZGVzaG93IjoiYWxsLWQzMWYxNWUifQ%3D%3D"
    >
    </a>
    <a
      href="https://develop.viviendasyvalores.com.co/wp-content/uploads/2022/05/AVANCE-CALLEJAS-MAYO-3.jpg"
      data-elementor-open-lightbox="yes"
      data-elementor-lightbox-slideshow="all-d31f15e"
      data-elementor-lightbox-title="AVANCE CALLEJAS MAYO (3)"
      data-e-action-hash="#elementor-action%3Aaction%3Dlightbox%26settings%3DeyJpZCI6OTI2MDUsInVybCI6Imh0dHBzOlwvXC9kZXZlbG9wLnZpdmllbmRhc3l2YWxvcmVzLmNvbS5jb1wvd3AtY29udGVudFwvdXBsb2Fkc1wvMjAyMlwvMDVcL0FWQU5DRS1DQUxMRUpBUy1NQVlPLTMuanBnIiwic2xpZGVzaG93IjoiYWxsLWQzMWYxNWUifQ%3D%3D"
    >
    </a>
    <a
      href="https://develop.viviendasyvalores.com.co/wp-content/uploads/2022/05/AVANCE-CALLEJAS-MAYO-4.jpg"
      data-elementor-open-lightbox="yes"
      data-elementor-lightbox-slideshow="all-d31f15e"
      data-elementor-lightbox-title="AVANCE CALLEJAS MAYO (4)"
      data-e-action-hash="#elementor-action%3Aaction%3Dlightbox%26settings%3DeyJpZCI6OTI2MDYsInVybCI6Imh0dHBzOlwvXC9kZXZlbG9wLnZpdmllbmRhc3l2YWxvcmVzLmNvbS5jb1wvd3AtY29udGVudFwvdXBsb2Fkc1wvMjAyMlwvMDVcL0FWQU5DRS1DQUxMRUpBUy1NQVlPLTQuanBnIiwic2xpZGVzaG93IjoiYWxsLWQzMWYxNWUifQ%3D%3D"
    >
    </a>
    <h6>ABRIL</h6>
    <a
      href="https://develop.viviendasyvalores.com.co/wp-content/uploads/2022/05/AVANCE-CALLEJAS-TORRES-ABRIL-2022-4.jpg"
      data-elementor-open-lightbox="yes"
      data-elementor-lightbox-slideshow="all-bd81dec"
      data-elementor-lightbox-title="AVANCE CALLEJAS TORRES ABRIL 2022 (4)"
      data-e-action-hash="#elementor-action%3Aaction%3Dlightbox%26settings%3DeyJpZCI6ODkxNTcsInVybCI6Imh0dHBzOlwvXC9kZXZlbG9wLnZpdmllbmRhc3l2YWxvcmVzLmNvbS5jb1wvd3AtY29udGVudFwvdXBsb2Fkc1wvMjAyMlwvMDVcL0FWQU5DRS1DQUxMRUpBUy1UT1JSRVMtQUJSSUwtMjAyMi00LmpwZyIsInNsaWRlc2hvdyI6ImFsbC1iZDgxZGVjIn0%3D"
    >
    </a>
    <a
      href="https://develop.viviendasyvalores.com.co/wp-content/uploads/2022/05/AVANCE-CALLEJAS-TORRES-ABRIL-2022-3.jpg"
      data-elementor-open-lightbox="yes"
      data-elementor-lightbox-slideshow="all-bd81dec"
      data-elementor-lightbox-title="AVANCE CALLEJAS TORRES ABRIL 2022 (3)"
      data-e-action-hash="#elementor-action%3Aaction%3Dlightbox%26settings%3DeyJpZCI6ODkxNTYsInVybCI6Imh0dHBzOlwvXC9kZXZlbG9wLnZpdmllbmRhc3l2YWxvcmVzLmNvbS5jb1wvd3AtY29udGVudFwvdXBsb2Fkc1wvMjAyMlwvMDVcL0FWQU5DRS1DQUxMRUpBUy1UT1JSRVMtQUJSSUwtMjAyMi0zLmpwZyIsInNsaWRlc2hvdyI6ImFsbC1iZDgxZGVjIn0%3D"
    >
    </a>
    <a
      href="https://develop.viviendasyvalores.com.co/wp-content/uploads/2022/05/AVANCE-CALLEJAS-TORRES-ABRIL-2022-2.jpg"
      data-elementor-open-lightbox="yes"
      data-elementor-lightbox-slideshow="all-bd81dec"
      data-elementor-lightbox-title="AVANCE CALLEJAS TORRES ABRIL 2022 (2)"
      data-e-action-hash="#elementor-action%3Aaction%3Dlightbox%26settings%3DeyJpZCI6ODkxNTUsInVybCI6Imh0dHBzOlwvXC9kZXZlbG9wLnZpdmllbmRhc3l2YWxvcmVzLmNvbS5jb1wvd3AtY29udGVudFwvdXBsb2Fkc1wvMjAyMlwvMDVcL0FWQU5DRS1DQUxMRUpBUy1UT1JSRVMtQUJSSUwtMjAyMi0yLmpwZyIsInNsaWRlc2hvdyI6ImFsbC1iZDgxZGVjIn0%3D"
    >
    </a>
    <a
      href="https://develop.viviendasyvalores.com.co/wp-content/uploads/2022/05/AVANCE-CALLEJAS-TORRES-ABRIL-2022-1.jpg"
      data-elementor-open-lightbox="yes"
      data-elementor-lightbox-slideshow="all-bd81dec"
      data-elementor-lightbox-title="AVANCE CALLEJAS TORRES ABRIL 2022 (1)"
      data-e-action-hash="#elementor-action%3Aaction%3Dlightbox%26settings%3DeyJpZCI6ODkxNTQsInVybCI6Imh0dHBzOlwvXC9kZXZlbG9wLnZpdmllbmRhc3l2YWxvcmVzLmNvbS5jb1wvd3AtY29udGVudFwvdXBsb2Fkc1wvMjAyMlwvMDVcL0FWQU5DRS1DQUxMRUpBUy1UT1JSRVMtQUJSSUwtMjAyMi0xLmpwZyIsInNsaWRlc2hvdyI6ImFsbC1iZDgxZGVjIn0%3D"
    >
    </a>`,
    };

    if (progress) {
      title.textContent = progress.title;
      const data = getInfo(progress.content);
      dataGallery = data;
      const years = dataGallery.reduce(
        (acc, cur, i) =>
          (acc += `
          <button class="${
            i === 0 ? "active" : ""
          }" onclick="selectFilter(${i})">
            <img src="https://cdnvyv.s3.us-east-2.amazonaws.com/wp-content/uploads/2023/05/25014953/icono_calendario.svg" alt="Icon" />
            <span>${cur.year}</span>
          </button>`),
        ""
      );
      filter_years.innerHTML = years;
      selectFilter(0);
    } else {
      title.textContent = "No disponible";
    }
  });

  btn.addEventListener("click", () => {
    const id = "125543";
    modal.setAttribute("data-post", id);
    titleModal.textContent = "Cargando...";
    photoModal.src =
      "https://develop.viviendasyvalores.com.co/wp-content/uploads/2023/04/Proyectos_Callejas.png";
    new bootstrap.Modal(modal, {}).show();
  });
});
