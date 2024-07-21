// Discount Calculator
function calculateDiscount() {
    const amountPaid = parseFloat(document.getElementById('amountPaid').value);
    const categoryDifference = parseInt(document.getElementById('categoryDifference').value);
    const daysLeft = document.getElementById('daysLeft').value;
    const didTravel = document.getElementById('didTravel').value === 'Yes' ? 0.02 : 0;
    const topBuyer = document.getElementById('topBuyer').value === 'Yes' ? 0.03 : 0;
    const sectorDifference = document.getElementById('sectorDifference').value === 'Yes' ? 0.1 : 0;
    const rowDifference = document.getElementById('rowDifference').value === 'Yes' ? 0.05 : 0;
    const formatDifference = document.getElementById('formatDifference').value === 'Yes' ? 0.05 : 0;

    let baseDiscount = 0;
    if (categoryDifference > 0) {
        baseDiscount += didTravel + topBuyer + sectorDifference + rowDifference + formatDifference;
    }

    const discountPercentage = baseDiscount * 100;
    const discountAmount = amountPaid * baseDiscount;
    const discountType = discountPercentage < 50 ? 'Voucher' : 'Partial Refund';
    const needTLApproval = amountPaid <= 250 ? 'Yes, Review MIR specifics as advised by TL' : 'NO. TL Approval Not Required';

    document.getElementById('discountPercentage').textContent = discountPercentage.toFixed(2) + '%';
    document.getElementById('discountAmount').textContent = discountAmount.toFixed(2);
    document.getElementById('discountType').textContent = discountType;
    document.getElementById('tlApproval').textContent = needTLApproval;
}

// Replacement Calculator
function calculateReplacement() {
    const amountPaid = parseFloat(document.getElementById('amount-paid').value);
    const originalPayout = parseFloat(document.getElementById('original-payout').value);
    const numberTickets = parseInt(document.getElementById('number-tickets').value);
    const newTicketPrice = parseFloat(document.getElementById('new-ticket-price').value);

    const estimatedLoss = (newTicketPrice * numberTickets) - amountPaid;
    const penaltyCalc1 = (newTicketPrice * numberTickets) - originalPayout;
    const penaltyCalc2 = 0.4 * originalPayout;
    const estimatedPenalty = Math.max(penaltyCalc1, penaltyCalc2);

    const needTLApproval = amountPaid <= 250 ? "Yes, Review MIR specifics as advised by TL" : "NO. TL Approval Not Required";

    document.getElementById('estimated-loss').textContent = `Estimated Loss: ${estimatedLoss.toFixed(2)}`;
    document.getElementById('estimated-penalty').textContent = `Estimated Penalty: ${estimatedPenalty.toFixed(2)}`;
    document.getElementById('tl-approval').textContent = `Need TL Approval: ${needTLApproval}`;
}

// Penalty & Loss Calculator
function calculatePenalty() {
    let amountPaid = parseFloat(document.getElementById('amountPaid').value);
    let originalPayout = parseFloat(document.getElementById('originalPayout').value);
    let newPayout = parseFloat(document.getElementById('newPayout').value);
    let sellerType = document.getElementById('sellerType').value;

    let loss = 0;
    if (sellerType === 'Consumer Seller') {
        loss = newPayout - amountPaid;
    } else if (sellerType === 'Broker - Top Seller') {
        loss = 0.0;
    }

    let penalty = newPayout - originalPayout;
    let penaltyType = '';
    if (sellerType === 'Consumer Seller') {
        penaltyType = 'Credit Memo via BPM';
    } else if (sellerType === 'Broker - Top Seller') {
        penaltyType = 'CTS';
    } else if (sellerType === 'Aggregator (TEVO, Logitix…)') {
        penaltyType = 'No Penalty';
    }

    let needTLApproval = amountPaid >= 250 ? 'Yes - Review MIR specifics as advised by TL' : 'NO. TL Approval Not Required';

    document.getElementById('lossResult').textContent = loss.toFixed(2);
    document.getElementById('penaltyResult').textContent = penalty.toFixed(2);
    document.getElementById('penaltyTypeResult').textContent = penaltyType;
    document.getElementById('tlApprovalResult').textContent = needTLApproval;

    checkPendingPayments();
}

function checkPendingPayments() {
    let pendingPayments = document.getElementById('pendingPayments').value;
    let sellerType = document.getElementById('sellerType').value;
    if (pendingPayments === 'Yes' && sellerType === 'Consumer Seller') {
        document.getElementById('amountPaymentsGroup').style.display = 'block';
    } else {
        document.getElementById('amountPaymentsGroup').style.display = 'none';
    }
}

document.getElementById('sellerType').addEventListener('change', checkPendingPayments);
document.getElementById('pendingPayments').addEventListener('change', checkPendingPayments);
