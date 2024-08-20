export const printTicket = (ticket) => {
    const printContent = `
    <div style="width: 80mm; font-family: Arial, sans-serif; text-align: center; padding: 10px;">
    <h1 style="color: #ff5733; font-size: 24px; margin-bottom: 20px;">
        Happy Land
    </h1>
    <div style="margin-bottom: 10px;">
        <p style="font-weight: bold;">تذكرة لعبة: 
        ${ticket.game.name}
        </p>
    </div>
    <div style="margin-bottom: 10px;">
        <p style="font-weight: bold;">التاريخ: 
        ${ticket.date}
        </p>
    </div>
    <div style="display: flex; flex-direction: row-reverse; flex-wrap: wrap; justify-content: center;">
        <div style="width: 40%; background-color: #f9f9f9; border: 1px solid #ddd; padding: 10px; margin-bottom: 10px;">
            <p style="font-weight: bold;">العدد</p>
            <p>${ticket.amount}</p>
        </div>
        <div style="width: 40%; background-color: #f9f9f9; border: 1px solid #ddd; padding: 10px; margin-bottom: 10px;">
            <p style="font-weight: bold;">السعر</p>
            <p>${ticket.total_price} جنيه</p>
        </div>
    </div>
</div>
`;

    let iframe = document.createElement("iframe");
    iframe.style.display = "none";
    document.body.appendChild(iframe);
    iframe.contentDocument.write(printContent);

    iframe.contentDocument.close();
    iframe.contentWindow.print();
    setTimeout(() => {
        document.body.removeChild(iframe);
    }, 1000);
};

export const printReport = (table) => {
    let iframe = document.createElement("iframe");
    iframe.style.display = "none";
    document.body.appendChild(iframe);

    let doc = iframe.contentDocument || iframe.contentWindow.document;

    // Copy all stylesheets to the iframe
    Array.from(document.styleSheets).forEach((styleSheet) => {
        // console.log(styleSheet);
        
        try {
            if (styleSheet.cssRules) { // For same-origin stylesheets
                let newStyleEl = document.createElement('style');
                Array.from(styleSheet.cssRules).forEach((rule) => {
                    newStyleEl.appendChild(document.createTextNode(rule.cssText));
                });
                doc.head.appendChild(newStyleEl);
            } else if (styleSheet.href) { // For linked stylesheets
                let newLinkEl = document.createElement('link');
                newLinkEl.rel = 'stylesheet';
                newLinkEl.href = styleSheet.href;
                doc.head.appendChild(newLinkEl);
            }
        } catch (e) {
            console.error(`Error processing stylesheet: ${styleSheet.href}`, e);
        }
    });

    // Write the table HTML to the iframe document
    doc.write(table);
    doc.close();

    // Print the iframe content
    iframe.contentWindow.print();

    setTimeout(() => {
        document.body.removeChild(iframe);
    }, 1000);
};
