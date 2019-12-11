$(document).ready(function () {
  let autoOrder = 0;
  let myBorder = 0;
  let edgeWidth = 2;
  let leftFrame, topFrame;

  const CONST_DATA_TYPE = {
    "TEXT": "text",
    "NUMBER": "number",
    "CURRENCY" : "currency",
    "CHECKBOX" : "checkbox",
    "DATE" : "date",
    "IMAGE" : "image",
    "SIGNATURE" : "signature"
  }
  
  const CONST_DATA_TYPE_CONFIG = {
    [CONST_DATA_TYPE.TEXT] : {
      "minLength": {
        "data-map": "data-min-length",
        "data-default": "0"
      },
      "maxLength": {
        "data-map": "data-max-length",
        "data-default": "100"
      },
      "defaultValue": {
        "data-map": "data-default-value",
        "data-default": ""
      },
      "require": {
        "data-map": "data-require",
        "data-default": false
      },
      "multiline": {
        "data-map": "data-multiline",
        "data-default": false
      }
    },
    [CONST_DATA_TYPE.NUMBER] : {
      "minValue": {
        "data-map": "data-min-value",
        "data-default": "100"
      },
      "maxValue": {
        "data-map": "data-max-value",
        "data-default": "100000000"
      },
      "defaultValue": {
        "data-map": "data-default-value",
        "data-default": "1000"
      }
    },
    [CONST_DATA_TYPE.CURRENCY] : {
      "minValue": {
        "data-map": "data-min-value",
        "data-default": "100"
      },
      "maxValue": {
        "data-map": "data-max-value",
        "data-default": "100000000"
      },
      "defaultValue": {
        "data-map": "data-default-value",
        "data-default": "1000"
      },
      "decimalSeparator": {
        "data-map": "data-decimal-separator",
        "data-default": ","
      },
      "decimalPlace": {
        "data-map": "data-decimal-place",
        "data-default": 2
      },
      "currencyUnit": {
        "data-map": "data-currency-unit",
        "data-default": ""
      },
      "displayCurrency": {
        "data-map": "data-display-currency",
        "data-default": "before"
      }
    },
    [CONST_DATA_TYPE.CHECKBOX] : {
      "default": {
        "data-map": "data-default",
        "data-default": true
      }
    },
    [CONST_DATA_TYPE.DATE] : {
      "dateFormat": {
        "data-map": "data-date-format",
        "data-default": "MM/DD/YYYY"
      }
    },
    [CONST_DATA_TYPE.IMAGE] : {
      "imageScale": {
        "data-map": "data-image-scale",
        "data-default": "fit"
      },
      "scaleGravity": {
        "data-map": "data-scale-gravity",
        "data-default": "top-left",
        "data-type": "radio"
      }
    },
    [CONST_DATA_TYPE.SIGNATURE] : {
      "scaleGravity": {
        "data-map": "data-scale-gravity",
        "data-default": "top-left",
        "data-type": "radio"
      }
    }
  };

  $("#pdf").click(function () {
    if (!$(this).hasClass("pane")) {
      $(".display-type-option.selected").removeClass("selected");
      // $(".side-bar-right").fadeOut(200);
    }
  });

  function handleClickDraw(e) {
    $(".display-type-option.selected").removeClass("selected");
    $("#pdf").off('mousedown');
    if ($(this).attr("data-tool-type") === "select") {
      return;
    }

    topFrame = $("#pdf-view").offset().top;
    leftFrame = $(".pdf-view").offset().left;
    let btnDrawNewEl = $(this);
    btnDrawNewEl.addClass("selected");
    $("#pdf").css("cursor", "crosshair");
    let drawType = $(this).attr("data-shape-type");
    let borderRadius = false;
    let square = false;

    switch (drawType) {
      case "circle":
        borderRadius = true;
        square = true;
        break;

      case "square":
        square = true;
        break;
    }

    let startPoint = {
      x: 0,
      y: 0
    };

    let endPoint = {
      x: 0,
      y: 0
    };

    let elAction = null;
    let canvas = $("#pdf").first();
    let offset = canvas.offset();

    $("#pdf")
      .mouseup(function (e) {
        e.preventDefault();
        let offsetX = e.pageX - leftFrame;
        let offsetY = e.pageY - topFrame + $("#pdf").scrollTop();
        let activeTool = $(".top-pdf-tool").find(".display-type-container .draw-button.selected");
        endPoint.x = offsetX;
        endPoint.y = offsetY;
        let elWidth = parseInt(Math.abs(endPoint.x - startPoint.x));
        let elHeight = (activeTool && activeTool.attr("data-shape-type") === "square") ? elWidth : parseInt(Math.abs(endPoint.y - startPoint.y));
        if (elAction) {
          elAction.animate({ width: ((endPoint.x >= startPoint.x) ? elWidth : elWidth * (-1)) - (2 * myBorder) + 'px', height: ((endPoint.y >= startPoint.y) ? elHeight : elHeight * (-1)) - (2 * myBorder) + 'px' }, 100);
          let id = "pane-" + new Date().getTime();
          let dataType = activeTool.attr("data-tool-type");
          let html = '<div id="' + id + '" class="pane" data-type="' + dataType + '"><span></span></div>';
          let htmlLeftEl = '<div id="el-' + id + '" class="el-item" data-type="' + dataType + '"></div>';
          $("#pdf").append(html);
          let createdEl = $("#" + id);
          createdEl.css("left", offsetX - elWidth).css("top", offsetY - elHeight).css("width", elWidth - (2 * myBorder) + "px").css("height", elHeight - (2 * myBorder) + "px").css("border-radius", borderRadius ? "50%" : "0%").attr("data-shape-type", drawType).attr("data-square", square ? "true" : "false");
          createdEl.attr("data-order", autoOrder);

          $.each(CONST_DATA_TYPE_CONFIG[dataType], (index, value) => {
            createdEl.attr(value["data-map"], value["data-default"]);
          });

          $("#list-page-element").find(".card").eq(getPositionPage(createdEl[0].offsetTop, true) - 1).find(".card-body").append(htmlLeftEl);
          autoOrder++;
          dragAndDrop(id);
          elAction.remove();
          elAction = null;

          $("#list-page-element").find(".card-body:not(:empty)").parents(".card").removeClass("hide");
          if (!$("#el-" + id).parents(".collapse").hasClass("show")) {
            $("#el-" + id).parents(".card").find(".card-header").trigger("click");
          }
          
          setTimeout(() => { createdEl.trigger("click"); }, 200);
          $(this).off('mouseup mousedown');
          btnDrawNewEl.removeClass('selected');
          $("#pdf").css("cursor", "unset");
        }
      })
      .mousemove(function (e) {
        e.preventDefault();
        if (elAction) {
          let offsetX = e.pageX - leftFrame;
          let offsetY = e.pageY - topFrame + $("#pdf").scrollTop();
          endPoint.x = offsetX;
          endPoint.y = offsetY;
          let elWidth = (square) ? parseInt(Math.abs(endPoint.y - startPoint.y)) : parseInt(Math.abs(endPoint.x - startPoint.x));
          let elHeight = parseInt(Math.abs(endPoint.y - startPoint.y));
          elAction.animate({ width: ((endPoint.x >= startPoint.x) ? elWidth : elWidth * (-1)) - (2 * myBorder) + 'px', height: ((endPoint.y >= startPoint.y) ? elHeight : elHeight * (-1)) - (2 * myBorder) + 'px' }, 0);
        }
      })
      .mousedown(function (e) {
        e.preventDefault();
        let id = "paness-" + new Date().getTime();
        let offsetX = e.pageX - leftFrame;
        let offsetY = e.pageY - topFrame + $("#pdf").scrollTop();
        $(this).append("<div class='pdf-component' id='" + id + "'></div>");
        let el = $(this).find("#" + id);
        el.css("left", offsetX).css("top", offsetY).css("border-radius", borderRadius ? "50%" : "0%");
        startPoint.x = offsetX;
        startPoint.y = offsetY;
        elAction = el;
      });
  }

  $(".draw-button").click(handleClickDraw);

  $("body").on("click mousedown", ".pane", function (e) {
    handleLoadDataFromPane($(this));
  });

  function handleLoadDataFromPane(element) {
    let propertyPanel = $('.side-bar-right');
    let type = $(element).attr("data-type");
    element = element[0];
    $(".group-single-input-option:not('.default-field')").addClass("hide");
    $(".group-single-checkbox-option:not('.default-field')").addClass("hide");
    propertyPanel.fadeIn(200);
    propertyPanel.attr("data-id", $(element).attr("id"));
    propertyPanel.find('input[name="x"]').val(element.offsetLeft);
    propertyPanel.find('input[name="y"]').val(element.offsetTop);
    propertyPanel.find('input[name="width"]').val(element.offsetWidth);
    propertyPanel.find('input[name="height"]').val(element.offsetHeight);
    propertyPanel.find('input[name="renderOrder"]').val($(element).attr("data-order"));
    propertyPanel.find('input[name="fieldName"]').val($(element).attr("data-name") ? $(element).attr("data-name") : $(element).attr("data-type") + "_" + $(element).attr("data-order"));
    propertyPanel.find('input[name="fieldLabel"]').val($(element).attr("data-label") ? $(element).attr("data-label") : $(element).attr("data-type") + " " + $(element).attr("data-order"));

    $.each(CONST_DATA_TYPE_CONFIG[type], (index, value) => {
      propertyPanel.find(`[name="${index}"]`).parents('.hide').removeClass("hide");
      if (typeof(value["data-default"]) !== "boolean" && value["data-type"] !== "radio") {
        propertyPanel.find(`[name="${index}"]`).val($(element).attr(value["data-map"]) ? $(element).attr(value["data-map"]) : value["data-default"]);
      } else if (value["data-type"] === "radio") {
        propertyPanel.find(`input[name="${index}"][value="${$(element).attr(value["data-map"])}"]`).prop("checked", true);
      } else {
        propertyPanel.find(`input[name="${index}"]`).prop("checked", $(element).attr(value["data-map"]) === "true" ? true : false);
      }
    });

    $("#el-" + $(element).attr("id")).html($(element).attr("data-type") + " " + $(element).attr("data-order"));
    $(element).find("span").html((type !== CONST_DATA_TYPE.CHECKBOX) ? $(element).attr("data-type") + " " + $(element).attr("data-order") : '<i class="fal fa-check"></i>');
    $('.top-pdf-tool').find('.display-type-option[data-tool-type="select"]').addClass('selected');
  }

  $("body").on("click", ".remove-field-btn", function (e) {
    let el = $(this).parents(".side-bar-right");
    handleDeleteEl(el.attr("data-id"));
  })

  $("body").on("change", ".side-bar-right input, .side-bar-right select", function (e) {
    handleChangeOption();
  });

  function handleChangeOption() {
    let el = $(".side-bar-right");
    let pane = $('#' + el.attr("data-id"));
    let type = pane.attr("data-type");
    pane.css("left", el.find('input[name="x"]').val() + "px");
    pane.css("top", el.find('input[name="y"]').val() + "px");
    pane.css("width", el.find('input[name="width"]').val() + "px");
    pane.css("height", el.find('input[name="height"]').val() + "px");
    pane.attr("data-order", el.find('input[name="renderOrder"]').val());
    pane.attr("data-name", el.find('input[name="fieldName"]').val());
    pane.attr("data-label", el.find('input[name="fieldLabel"]').val());
    if (type !== CONST_DATA_TYPE.CHECKBOX) {
      pane.find("span").html(el.find('input[name="fieldLabel"]').val());
    }
    $("#el-" + el.attr("data-id")).html(el.find('input[name="fieldLabel"]').val());

    $.each(CONST_DATA_TYPE_CONFIG[type], (index, value) => {
      if (typeof(value["data-default"]) !== "boolean" && value["data-type"] !== "radio") {
        pane.attr(value["data-map"], el.find(`[name="${index}"]`).val());
      } 
      else if (value["data-type"] === "radio") {
        pane.attr(value["data-map"], el.find(`[name="${index}"]:checked`).val());
      } else {
        pane.attr(value["data-map"], el.find(`input[name="${index}"]`)[0].checked ? true : false);
      }
    });
  }

  function handleDeleteEl(id) {
    $("#" + id).remove();
    $("#el-" + id).remove();
    $('.side-bar-right').fadeOut(200);
  }

  // Delete Component Drawing
  $("body").on("click", ".pane", function (e) {
    $('html').keyup(function (e) {
      if (e.keyCode == 46) {
        handleDeleteEl($('.side-bar-right').attr('data-id'));
      }
    });
  })

  function parsField(stringParse) {
    let parString = stringParse.split(";");
    let option = {};
    for (let key in parString) {
      let data = parString[key].split(":");
      data[0] = data[0] ? data[0].trim() : '';
      data[1] = data[1] ? data[1].replace('px', '').trim() : '';
      if (data[0] && data[1]) {
        option[data[0]] = data[1];
      }
    }
    return option;
  }

  $('#save-form').click(function () {
    let dataFiled = [];
    $.each($('.pane'), function (k, v) {
      const $this = $(this);
      const option = parsField($this.attr('style'));
      const scale = ($("#pdf").attr("data-scale")) ? parseFloat($("#pdf").attr("data-scale")) : 1;
      const data = {
        page: $this.attr('data-page'),
        fontSize: $this.attr('data-font'),
        style: $this.attr('style'),
        left: option.left / scale,
        top: option.top / scale,
        height: option.height / scale,
        width: option.width / scale,
      };
      dataFiled.push(data);
    })

    let formData = new FormData();
    formData.append('data', dataFiled);
    // Attach file
    formData.append('file', $('input[type=file]')[0].files[0]);

    let form_data = new FormData();
    let attachment_data = $("#upload")[0].files[0];
    form_data.append("file_upload", attachment_data);
    form_data.append('data_field', JSON.stringify(dataFiled));
    $.ajax({
      type: "POST",
      cache: false,
      url: "http://167.71.208.50:8028/upload",
      data: form_data,    // multiple data sent using ajax
      contentType: false,
      processData: false,
      success: function (html) {
        window.open(html.url);
      }
    });
  })

  function dragAndDrop(paneId) {
    // Minimum resizable area
    let minWidth = 30;
    let minHeight = 30;

    // Thresholds
    let FULLSCREEN_MARGINS = -10;
    let MARGINS = 4;

    // End of what's configurable.
    let clicked = null;
    let onRightEdge, onBottomEdge, onLeftEdge, onTopEdge;

    let rightScreenEdge, bottomScreenEdge;

    let preSnapped;

    let b, x, y;

    let redraw = false;

    //  let checkMoveOut; 

    let pane = document.getElementById(paneId);

    function setBounds(element, x, y, w, h) {
      element.style.left = x + 'px';
      element.style.top = y + 'px';
      element.style.width = w + 'px';
      element.style.height = h + 'px';
    }

    // Mouse events
    pane.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mousemove', onMove);
    pane.addEventListener('mouseup', onUp);

    // Touch events	
    pane.addEventListener('touchstart', onTouchDown);
    pane.addEventListener('touchmove', onTouchMove);
    pane.addEventListener('touchend', onTouchEnd);


    function onTouchDown(e) {
      onDown(e.touches[0]);
      e.preventDefault();
    }

    function onTouchMove(e) {
      onMove(e.touches[0]);
    }

    function onTouchEnd(e) {
      if (e.touches.length == 0) onUp(e.changedTouches[0]);
    }

    function onMouseDown(e) {
      onDown(e);

      e.preventDefault();
    }

    function onDown(e) {

      calc(e);

      let isResizing = onRightEdge || onBottomEdge || onTopEdge || onLeftEdge;

      clicked = {
        x: x,
        y: y,
        cx: e.clientX,
        cy: e.clientY,
        w: b.width,
        h: b.height,
        isResizing: isResizing,
        isMoving: !isResizing && canMove(),
        onTopEdge: onTopEdge,
        onLeftEdge: onLeftEdge,
        onRightEdge: onRightEdge,
        onBottomEdge: onBottomEdge
      };

    }

    function canMove() {
      return x > 0 && x < b.width && y > 0 && y < b.height;
    }

    function calc(e) {
      b = pane.getBoundingClientRect();
      x = e.clientX - b.left;
      y = e.clientY - b.top;

      onTopEdge = y < MARGINS;
      onLeftEdge = x < MARGINS;
      onRightEdge = x >= b.width - MARGINS;
      onBottomEdge = y >= b.height - MARGINS;
    }

    let e;

    function onMove(ee) {
      calc(ee);

      e = ee;

      redraw = true;

    }

    function animate() {

      requestAnimationFrame(animate);

      if (!redraw) return;

      redraw = false;

      if (clicked && clicked.isResizing) {

        if (clicked.onRightEdge) {
          pane.style.width = Math.max(x + edgeWidth, minWidth) + 'px';
          if ($(pane).attr("data-square") === "true") {
            pane.style.height = pane.style.width;
          }
        }

        if (clicked.onBottomEdge) {
          pane.style.height = Math.max(y + edgeWidth, minHeight) + 'px';
          if ($(pane).attr("data-square") === "true") {
            pane.style.width = pane.style.height;
          }
        }

        if (clicked.onLeftEdge) {
          let currentWidth = Math.max(clicked.cx - e.clientX + clicked.w, minWidth);
          if (currentWidth > minWidth) {
            pane.style.width = currentWidth + 'px';
            pane.style.left = e.clientX - leftFrame - (2 * edgeWidth) + 'px';
            if ($(pane).attr("data-square") === "true") {
              pane.style.height = pane.style.width;
            }
          }
        }

        if (clicked.onTopEdge) {
          let currentHeight = Math.max(clicked.cy - e.clientY + clicked.h, minHeight);
          if (currentHeight > minHeight) {
            pane.style.height = currentHeight + 'px';
            pane.style.top = e.clientY + $("#pdf").scrollTop() - topFrame - (2 * edgeWidth) + 'px';
            if ($(pane).attr("data-square") === "true") {
              pane.style.width = pane.style.height;
            }
          }
        }

        return;
      }

      if (clicked && clicked.isMoving) {
        b = pane.getBoundingClientRect();
        if (preSnapped) {
          setBounds(pane,
            e.clientX - preSnapped.width / 2,
            e.clientY - Math.min(clicked.y, preSnapped.height),
            preSnapped.width,
            preSnapped.height);

          return;
        }

        // moving
        pane.style.top = e.clientY - clicked.y + $("#pdf").scrollTop() - topFrame + 'px';
        pane.style.left = e.clientX - clicked.x - leftFrame + 'px';
        pane.setAttribute('data-top', e.clientY - clicked.y);
        return;
      }

      // This code executes when mouse moves without clicking

      // style cursor
      if (onRightEdge && onBottomEdge || onLeftEdge && onTopEdge) {
        pane.style.cursor = 'nwse-resize';
      } else if (onRightEdge && onTopEdge || onBottomEdge && onLeftEdge) {
        pane.style.cursor = 'nesw-resize';
      } else if (onRightEdge || onLeftEdge) {
        pane.style.cursor = 'ew-resize';
      } else if (onBottomEdge || onTopEdge) {
        pane.style.cursor = 'ns-resize';
      } else if (canMove()) {
        pane.style.cursor = 'move';
      } else {
        pane.style.cursor = 'default';
      }
    }

    animate();

    function onUp(e) {
      e.stopPropagation();
      let paneElOnLeft = $("#el-" + $(pane).attr('id'));
      let top = e.clientY - clicked.y + $("#pdf").scrollTop();
      let page = getPositionPage(top);
      if ((page - 1) !== paneElOnLeft.parents(".card").index()) {
        $("#list-page-element").find(".card").eq(page - 1).find(".card-body").append(paneElOnLeft[0].outerHTML);
        paneElOnLeft.remove();

        $("#list-page-element").find(".card-body:empty").parents(".card").addClass("hide");
        $("#list-page-element").find(".card-body:not(:empty)").parents(".card").removeClass("hide");
        if (!$("#list-page-element").find(".card").eq(page - 1).find(".collapse ").hasClass("show")) {
          setTimeout(() => {
            $("#list-page-element").find(".card").eq(page - 1).find(".card-header").trigger("click");
          }, 300);
        }
      } else if (!$(pane).attr("data-page")) {
        $("#list-page-element").find(".card-body:not(:empty)").parents(".card").removeClass("hide");
        if (!$("#list-page-element").find(".card").eq(page - 1).find(".collapse ").hasClass("show")) {
          setTimeout(() => {
            $("#list-page-element").find(".card").eq(page - 1).find(".card-header").trigger("click");
          }, 300);
        }
      }
      pane.setAttribute('data-page', page);
      let dataOption = $(this).attr('data-select') ? $(this).attr('data-select') : '';
      $('.side-bar-right').find('input[name=title]').val($(this).find('span').html());
      $('.side-bar-right').find('input[name=font]').val($(this).attr('data-font'));
      $('.side-bar-right').find('select[name=type]').find('option').each(function () {
        if ($(this).val() === dataOption) {
          $(this).prop("selected", true);
        }
      });

      calc(e);

      if (clicked && clicked.isMoving) {
        // Snap
        let snapped = {
          width: b.width,
          height: b.height
        };

        // Over Right Edge
        if ((b.left + b.width - leftFrame) > $("#pdf canvas").first().innerWidth()) {

          // Check Move On Top-Right Edge
          if ((b.top) < $("#pdf canvas").offset().top) {
            setBounds(pane, $("#pdf canvas").first().innerWidth() - b.width, $("#pdf canvas").offset().top - topFrame, b.width, b.height);
          } else {
            setBounds(pane, $("#pdf canvas").first().innerWidth() - b.width, b.top + $("#pdf").scrollTop() - topFrame, b.width, b.height);
          }
        }

        // Over Left Edge
        else if ((b.left) < $("#pdf canvas").offset().left) {

          // Check Move On Top-Left Edge
          if ((b.top) < $("#pdf canvas").offset().top) {
            setBounds(pane, $("#pdf canvas").offset().left - leftFrame, $("#pdf canvas").offset().top - topFrame, b.width, b.height);
          } else {
            setBounds(pane, $("#pdf canvas").offset().left - leftFrame, b.top - topFrame + $("#pdf").scrollTop(), b.width, b.height);
          }
        }

        // Over Top Edge
        else if ((b.top) < $("#pdf canvas").offset().top) {
          setBounds(pane, b.left - leftFrame, $("#pdf canvas").offset().top - topFrame, b.width, b.height);
        }
      }

      clicked = null;

    }

    $('canvas').on("drop", function (event) {
      console.log(event);
    });
    // let title = document.querySelector('.title');
    // let font = document.querySelector('.font');
    // let selectField = document.getElementById('type');
    // title.addEventListener('keyup', onKeyup);
    // font.addEventListener('keyup', onKeyupFont);
    // selectField.addEventListener('change', onChangeSelect);

    function onKeyup(e) {
      let id = this.parentNode.getAttribute('data-id');
      document.getElementById(id).children[0].innerHTML = this.value;
      document.getElementById(id).setAttribute('data-title', this.value);
    }
    function onKeyupFont(e) {
      let id = this.parentNode.getAttribute('data-id');
      document.getElementById(id).setAttribute('data-font', this.value);
    }
    function onChangeSelect(e) {
      let id = this.parentNode.getAttribute('data-id');
      document.getElementById(id).setAttribute('data-select', this.value);
    }

  }

  function getPositionPage(postion, hasTopPrevent) {
    let heightPage = 0;
    let page = null;
    $.each($('canvas'), function (index, val) {
      heightPage = $(this).outerHeight() * (index + 1); //heightPage + parseInt($(this).attr('height')) - 3;
      if (((postion - topFrame) <= heightPage && !hasTopPrevent) || (hasTopPrevent && postion <= heightPage)) {
        page = index;
        return false;
      }
    })

    if (page === null) {
      page = $('canvas').length;
    }
    return page + 1;
  }
});
