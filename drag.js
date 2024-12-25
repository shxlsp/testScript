const dom = document
				.querySelector("import-map-overrides-full")
				.shadowRoot.querySelector(".imo-trigger");
			let isDragging = false;
			let offsetXPercent, offsetYPercent, width, height;

			dom.addEventListener("mousedown", startDragging);
			document.addEventListener("mousemove", drag);
			document.addEventListener("mouseup", stopDragging);

			function constrainToScreen({ isMaxLeft, isMaxTop, isMinLeft, isMinTop }) {
				dom.style.transform = `translate(${isMaxLeft ? "-100%" : 0}, ${
					isMaxTop ? "-100%" : 0
				})`;
			}

			function drag(e) {
				if (isDragging) {
					const screenWidth = window.innerWidth;
					const screenHeight = window.innerHeight;
					let leftPercent = Math.ceil(
						((e.clientX - offsetXPercent * dom.offsetWidth) / screenWidth) * 100
					);
					let topPercent = Math.ceil(
						((e.clientY - offsetYPercent * dom.offsetHeight) / screenHeight) *
							100
					);
					let widthPercent = Math.ceil((width / screenWidth) * 100);
					let heightPercent = Math.ceil((height / screenHeight) * 100);

					let isMaxLeft = leftPercent + widthPercent >= 100;
					let isMaxTop = topPercent + heightPercent >= 100;
					let isMinLeft = leftPercent === 0;
					let isMinTop = topPercent === 0;

					leftPercent = Math.max(0, Math.min(100, leftPercent));
					topPercent = Math.max(0, Math.min(100, topPercent));
					dom.style.left = leftPercent + "%";
					dom.style.top = topPercent + "%";
					constrainToScreen({ isMaxLeft, isMaxTop, isMinLeft, isMinTop });
				}
			}

			function startDragging(e) {
				isDragging = true;
				const rect = dom.getBoundingClientRect();
				offsetXPercent = (e.clientX - rect.left) / rect.width;
				offsetYPercent = (e.clientY - rect.top) / rect.height;
				width = rect.width;
				height = rect.height;
			}

			function stopDragging() {
				isDragging = false;
			}