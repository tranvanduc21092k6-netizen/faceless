onRecordAfterUpdateRequest((e) => {
    console.log("TEST HOOK TRIGGERED!");
    try {
        const oldStatus = e.record.originalCopy().get("status");
        console.log("OLD STATUS:", oldStatus);
    } catch(err) {
        console.log("ERROR in test hook:", err.message);
    }
}, "payments")
