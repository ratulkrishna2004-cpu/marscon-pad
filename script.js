const canvas = new fabric.Canvas('padCanvas');

// A4 Ratio (Standard 96 DPI)
const A4_WIDTH = 794;
const A4_HEIGHT = 1123;

// ১. HD Background Template Load
fabric.Image.fromURL('Pad.jpg', function(img) {
    canvas.setDimensions({ width: A4_WIDTH, height: A4_HEIGHT });

    // Ensure the image fits the A4 canvas exactly
    img.set({
        scaleX: A4_WIDTH / img.width,
        scaleY: A4_HEIGHT / img.height,
        selectable: false, // Background lock
        evented: false     // Background unclickable
    });

    canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
}, { crossOrigin: 'anonymous' });

// ২. Add Text Box Function
function addText() {
    const size = document.getElementById('fontSize').value;
    const text = new fabric.IText('Double click to type...', {
        left: 300, 
        top: 300,
        fontFamily: 'Arial',
        fontSize: parseInt(size),
        fill: '#000',
        transparentCorners: false,
        cornerColor: '#0d47a1',
        cornerSize: 8
    });
    canvas.add(text);
    canvas.setActiveObject(text);
}

// ৩. Delete Function
function deleteSelected() {
    const activeObject = canvas.getActiveObject();
    if (activeObject && !activeObject.isEditing) {
        canvas.remove(activeObject);
    }
}

// ৪. Download HD PDF
function downloadPDF() {
    const { jsPDF } = window.jspdf;

    // High Resolution Image Capture (Multiplier increases quality)
    const dataURL = canvas.toDataURL({
        format: 'jpeg',
        quality: 1.0,
        multiplier: 2 // Generates 2x resolution for HD printing
    });

    const pdf = new jsPDF('p', 'px', [A4_WIDTH, A4_HEIGHT]);
    pdf.addImage(dataURL, 'JPEG', 0, 0, A4_WIDTH, A4_HEIGHT);
    pdf.save("MARSCON_Digital_Pad.pdf");
}

// Keyboard Shortcut for Delete
window.addEventListener('keydown', (e) => {
    if (e.key === "Delete" || e.key === "Backspace") {
        const activeObject = canvas.getActiveObject();
        // Check if not editing text to avoid deleting while typing
        if (activeObject && !activeObject.isEditing) {
            canvas.remove(activeObject);
        }
    }
});