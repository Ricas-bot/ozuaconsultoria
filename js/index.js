// Alteração da Navbar ao rolar a página
$(window).on("scroll", function () {
  $(".navbar").toggleClass("scrolled", $(this).scrollTop() > 50);
});

// Cursor Personalizado
if ($(".mouse-cursor").length) {
  const cursorInner = document.querySelector(".cursor-inner"),
    cursorOuter = document.querySelector(".cursor-outer");

  window.onmousemove = function (e) {
    cursorOuter.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    cursorInner.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
  };

  $("body")
    .on("mouseenter", "a, .cursor-pointer", function () {
      cursorInner.classList.add("cursor-hover");
      cursorOuter.classList.add("cursor-hover");
    })
    .on("mouseleave", "a, .cursor-pointer", function () {
      if (!$(this).is("a") || !$(this).closest(".cursor-pointer").length) {
        cursorInner.classList.remove("cursor-hover");
        cursorOuter.classList.remove("cursor-hover");
      }
    });

  cursorInner.style.visibility = "visible";
  cursorOuter.style.visibility = "visible";
}

// Pausar vídeo ao fechar o modal
$("#videoModal").on("hidden.bs.modal", function () {
  const iframe = $(this).find("iframe");
  const src = iframe.attr("src");
  iframe.attr("src", "").attr("src", src);
});

$(document).ready(function () {
  var carousels = $("#cursos .carousel");
  var buttons = $(".tab-buttons button");
  var descriptions = $(".descCursos");

  // JSON declarado no próprio script
  var cursos = {
    empresas: [
      {
        titulo: "Curso de Auditoria e Compliance em Excel",
        descricao: "Descrição breve do Curso.",
        imagem: "./assets/images/cursos/auditoria-compliance-excel.jpeg"
      },
      {
        titulo: "Curso de Auditoria e Compliance em Power BI",
        descricao: "Descrição breve do Curso.",
        imagem: "./assets/images/cursos/auditoria-compliance-pbi.jpeg"
      },
      {
        titulo: "Curso de Excel para Advogados",
        descricao: "Descrição breve do Curso.",
        imagem: "./assets/images/cursos/excel-advogados.jpeg"
      },
      {
        titulo: "Curso de Excel Financeiro",
        descricao: "Descrição breve do Curso.",
        imagem: "./assets/images/cursos/excel-fin.jpeg"
      },
      {
        titulo: "Curso de Excel para Recursos Humanos",
        descricao: "Descrição breve do Curso.",
        imagem: "./assets/images/cursos/excel-rh.jpeg"
      },
      {
        titulo: "Curso de Oratória",
        descricao: "Descrição breve do Curso.",
        imagem: "./assets/images/cursos/oratoria.jpeg"
      }
    ],
    singulares: [
      {
        titulo: "Curso de Plano Estratégico",
        descricao: "Descrição breve do Curso.",
        imagem: "./assets/images/cursos/plano-estratégico.jpeg"
      },
      {
        titulo: "Curso de Pintura",
        descricao: "Descrição breve do Curso.",
        imagem: "https://via.placeholder.com/300x300"
      },
      {
        titulo: "Curso de Desenvolvimento Web",
        descricao: "Descrição breve do Curso.",
        imagem: "https://via.placeholder.com/300x300"
      },
      {
        titulo: "Curso de Yoga",
        descricao: "Descrição breve do Curso.",
        imagem: "https://via.placeholder.com/300x300"
      }
    ]
  };

  // Função para carregar cursos dinamicamente
  function carregarCursos(cursos, target) {
    var container = $(target).find(".carousel-inner");
    var screenWidth = $(window).width();
    var itemsPerSlide = screenWidth >= 768 ? 3 : 1; // 3 itens para desktop, 1 item para mobile
    var cursosGrupo = [];

    // Agrupar cursos de acordo com a tela
    $.each(cursos, function (index, curso) {
      cursosGrupo.push(curso);
      if (cursosGrupo.length === itemsPerSlide || index === cursos.length - 1) {
        var grupoHtml = `
          <div class="carousel-item ${container.find('.carousel-item').length === 0 ? 'active' : ''}">
            <div class="d-flex justify-content-center">
              ${cursosGrupo
                .map(function (curso) {
                  return `
                  <div class="course-item">
                    <div class="course-img-container">
                      <img src="${curso.imagem}" class="card-img-top" alt="${curso.titulo}" loading="lazy"/>
                      <div class="course-overlay">
                        <div class="course-info">
                          <h5 class="card-title">${curso.titulo}</h5>
                          <p class="card-text">${curso.descricao}</p>
                        </div>
                      </div>
                    </div>
                  </div>`;
                })
                .join("")}
            </div>
          </div>`;
        container.append(grupoHtml);
        cursosGrupo = [];
      }
    });
  }

  // Carregar cursos para Empresas e Singulares
  carregarCursos(cursos.empresas, "#carouselEmpresas");
  carregarCursos(cursos.singulares, "#carouselSingulares");

  // Tornar o primeiro carrossel visível e ativar o botão correspondente
  carousels.first().removeClass("d-none").addClass("active");
  buttons.first().removeClass("btn-outline-light").addClass("btn-primary");
  descriptions.first().removeClass("d-none").addClass("active");

  // Alternar os tipos de cursos e as descrições
  buttons.on("click", function () {
    var target = $(this).data("target");
    var index = buttons.index(this);

    // Alternar carrosséis
    carousels.removeClass("active").addClass("d-none");
    $(target).removeClass("d-none").addClass("active");

    // Alternar botões
    buttons
      .removeClass("btn-primary")
      .addClass("btn-outline-light")
      .attr("aria-selected", "false");
    $(this)
      .removeClass("btn-outline-light")
      .addClass("btn-primary")
      .attr("aria-selected", "true");

    // Alternar descrições
    descriptions.addClass("d-none").removeClass("active");
    descriptions.eq(index).removeClass("d-none").addClass("active");
  });

  // Abrir modal com informações do curso
  $(".course-item").on("click", function () {
    var courseInfo = $(this).data("course-info");
    $("#courseModalLabel").text(courseInfo);
    $("#courseIframe").attr(
      "src",
      "https://www.example.com/course/" + encodeURIComponent(courseInfo)
    );
    $("#courseModal").modal("show");
  });
});

$(document).ready(function () {
  // Mostrar o botão quando o usuário rolar para baixo 100px
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $('#scrollToTopBtn').fadeIn();
    } else {
      $('#scrollToTopBtn').fadeOut();
    }
  });

  // Rolar para o topo quando o botão for clicado
  $('#scrollToTopBtn').click(function () {
    $('html, body').animate({ scrollTop: 0 }, '300');
    return false;
  });
});
