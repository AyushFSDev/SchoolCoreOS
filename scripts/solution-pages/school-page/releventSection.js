
      function tmToggle(el) {
        const isOpen = el.classList.contains("tm-open");
        document.querySelectorAll(".tm-acc").forEach((a) => a.classList.remove("tm-open"));
        if (!isOpen) el.classList.add("tm-open");
      }