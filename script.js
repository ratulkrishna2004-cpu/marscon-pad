// Quill Editor Initialize
var quill = new Quill('#editor-container', {
    theme: 'snow',
    placeholder: 'Sir, eikhane apnar content likhun...',
    modules: {
        toolbar: [
            ['bold', 'italic', 'underline'],        // Text style
            [{ 'list': 'ordered'}, { 'list': 'bullet' }], // Lists
            ['image', 'link'],                      // Image and Links
            [{ 'align': [] }],
            ['clean']                               // Clear formatting
        ]
    }
});

// PDF Download Function
document.getElementById('download-btn').addEventListener('click', function () {
    const element = document.getElementById('pad-area');
    
    // PDF options
    const opt = {
        margin:       0,
        filename:     'Conference_Pad.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true },
        jsPDF:        { unit: 'px', format: [794, 1123], orientation: 'portrait' }
    };

    // Download command
    html2pdf().set(opt).from(element).save();
});