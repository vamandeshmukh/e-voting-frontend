import VoterService from "./VoterService";



beforeEach(()=>{
    console.log('beforeEach called')
});


afterEach(()=>{
    console.log('AfterEach called')
});


test('Testing find voter by Aadhar id', async () => {
    let service = new VoterService();
    let result = await service.getVoterByAadhaar(333300001111);
    expect(result.data.voterFirstName).toBe('Soham')
})

test('Testing view All Election Schedule', async () => {
    let service = new VoterService();
    await service.getElectionSchedule().then((result) => {
    expect(result.data.length).toBeGreaterThanOrEqual(0);
    })
})

test('Testing view All Parties', async () => {
    let service = new VoterService();
    await service.getParty().then((result) => {
    expect(result.data.length).toBeGreaterThanOrEqual(0);
    })
})

test('Testing view All Candidates', async () => {
    let service = new VoterService();
    await service.getCandidates().then((result) => {
    expect(result.data.length).toBeGreaterThanOrEqual(0);
    })
})

test('Testing view canndidates by constituency', async () => {
    let service = new VoterService();
    let result = await service.viewCandidatesByConstituency(333300001111);
    expect(result.data.length).toBeGreaterThanOrEqual(0);
})


test.skip('Testing add Voter', async () => {
    let service = new VoterService();
    let voter = `{

        
            "aadhaarId": "741079920100",
            "city": "Pune",
            "constituencyId": "2",
            "district": "Raigad",
            "dob": "21-01-1994",
            "gender": "Male",
            "houseNo": "05",
            "locality": "string",
            "mobile": "9765260364",
            "pincode": "400024",
            "state": "Mh",
            "street": "Dc",
            "voterEmail": "vishal@gmail.com",
            "voterFirstName": "Virat",
            "voterLastName": "Singh",
            "voterMiddleName": "V",
            "voterPassword": "V123"
          
          
    }
    `
    await service.addVoter(JSON.parse(voter)).then((result) => {
        console.log(result.data)
        expect(result.data).toBe('Successfully registered')
    })
})


test.skip('Testing view vote for all Candidates', async () => {
    let service = new VoterService();
    await service.getVoteForAllCandidates().then((result) => {
    expect(result.data.length).toBeGreaterThanOrEqual(0);
    })
})

test.skip('Testing view vote for all parties', async () => {
    let service = new VoterService();
    await service.getVoteForAllParty().then((result) => {
    expect(result.data.length).toBeGreaterThanOrEqual(0);
    })
})

test.skip('Testing view party vote by constituencyid', async () => {
    let service = new VoterService();
    let result = await service.getVoteForConstituency(2);
    expect(result.data.length).toBeGreaterThanOrEqual(0);

})

