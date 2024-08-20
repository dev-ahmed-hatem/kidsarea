export const handlePrint = (ticket) => {
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

    // const printWindow = window.open("", "", "width=400,height=600");
    // printWindow.document.write(
    //     "<html><head><title>Print Ticket</title></head><body>"
    // );
    // printWindow.document.write(printContent);
    // printWindow.document.write("</body></html>");
    // // printWindow.document.close();
    // printWindow.focus();
    // printWindow.print();
    // // printWindow.close();
};
