document.addEventListener("DOMContentLoaded", () =>{
    const $boton = document.querySelector('#crear_pdf');
    $boton.addEventListener("click", () =>{
        const $elementoparaconvertir = document.getElementsByClassName('carta_carrito');
        html2pdf()
            .set({
                margin: 1,
                filename: 'carritodecompras.pdf',
                image: {
                    type: 'jpeg',
                    quality: 0.98,
                },
                html2canvas: {
                    scale: 3,
                    letterRendering: true,
                },
                jsPDF: {
                    unit: "in",
                    format: "a3",
                    orientation: 'portrait'
                }
            })
            .from($elementoparaconvertir)
            .save()
            .catch(err => console.log(err));
            
    });
});