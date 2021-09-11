import AdminService from "./AdminService";



beforeEach(() => {
    console.log('beforeEach called')
});


afterEach(() => {
    console.log('AfterEach called')
});

// ELECTION TESTING
test('Testing find Election by id', async () => {
    let service = new AdminService();
    let result = await service.getElectionById(1);
    expect(result.data.electionName).toBe('State Election')
})

test('Testing view AllElection', async () => {
    let service = new AdminService();
    await service.getAllElection().then((result) => {
        expect(result.data.length).toBeGreaterThanOrEqual(0);
    })
})

test('Testing find Election by name', async () => {
    let service = new AdminService();
    let result = await service.getElectionByName('State Election');
    expect(result.data[0].electionId).toBe(1)
})

test('Testing find Election by type', async () => {
    let service = new AdminService();
    let result = await service.getElectionByType('Maharashtra')
    expect(result.data[0].electionId).toBe(1);
})


test.skip('Testing add Election', async () => {
    let service = new AdminService();
    let election = `{

        "electionName": "TestElection",
        "electionType": "Test",
        "electionDate": "16-08-2021"
          
    }
    `
    await service.addElection(JSON.parse(election)).then((result) => {
        expect(result.data).toBe('election with electionId is added"')
    })
})


test.skip('Testing to remove Election', async () => {
    let service = new AdminService();
    await service.deleteElection(2).then((result) => {
        expect(result.data).toBe("Given election id deleted")
    })
})



// CANDIDATE TESTING
test('Testing find candidate by id', async () => {
    let service = new AdminService();
    let result = await service.getCandidateById(1);

    expect(result.data.candidateName).toBe('Gopal Shetty')
})



test('Testing find candidate by name', async () => {
    let service = new AdminService();
    let result = await service.getCandidateByName('Gopal Shetty')
    expect(result.data.candidateId).toBe(1);
})


test('Testing view Allcandidates', async () => {
    let service = new AdminService();
    await service.getAllCandidates().then((result) => {
        expect(result.data.length).toBeGreaterThanOrEqual(0);
    })
})

test.skip('Testing add Candidates', async () => {
    let service = new AdminService();
    let candidate = `{

            "candidateName": "Test",
            "partyRegId": "BJP01",
            "constituencyId": "2"
          
    }
    `
    await service.addCandidate(JSON.parse(candidate)).then((result) => {
        console.log(result.data)
        expect(result.data).toBe('candidate with candidateId 10 is added')
    })
})

test.skip('Testing remove Candidate', async () => {
    let service = new AdminService();
    await service.deleteCandidateById(5).then((result) => {
        console.log(result.data)
        expect(result.data).toBe('candidate with the given Id deleted')
    })
})

test.skip('Testing Update Candidate Name by id', async () => {
    let service = new AdminService();
    let candidate =
        `{
            "candidateId":"7",
            "candidateName": "Suraj",
           
    }
    `
    await service.updateCandidate(JSON.parse(candidate)).then((result) => {
        console.log(result.data)
        expect(result.data).toBe("Given Candidate Record with id 7 is Updated")
    })
})


// CONSTITUENCY TESTING

test('Testing find Comnstituency by id', async () => {
    let service = new AdminService();
    let result = await service.getConstituencyById(1);
    expect(result.data.constituencyName).toBe('Mumbai')
})



test('Testing find constituency by name', async () => {
    let service = new AdminService();
    let result = await service.getConstituencyByName('Pune')
    expect(result.data.constituencyId).toBe(2);
})


test('Testing view Allconstituency', async () => {
    let service = new AdminService();
    await service.getAllConstituency().then((result) => {
        expect(result.data.length).toBeGreaterThanOrEqual(0);
    })
})

test.skip('Testing add Constituency', async () => {
    let service = new AdminService();
    let constituency = `{

        "constituencyName": "Nashik",
        "state": "Maharashtra",
        "electionId": 1
          
    }
    `
    await service.addConstituency(JSON.parse(constituency)).then((result) => {
        console.log(result.data)
        expect(result.data).toBe('constituency with id ConstituencyId is added')
    })
})

test.skip('Testing remove constituency', async () => {
    let service = new AdminService();
    await service.deleteConstituencyById(3).then((result) => {
        console.log(result.data)
        expect(result.data).toBe("Constituency with the given Id deleted")
    })
})


// PARTY TESTING



test('Testing find Party by id', async () => {
    let service = new AdminService();
    let result = await service.getPartyById("SS01");
    expect(result.data.partyName).toBe('Shivsena')
})



test('Testing find Party by name', async () => {
    let service = new AdminService();
    let result = await service.getPartyByName('Shivsena')
    expect(result.data.regId).toBe('SS01');
})


test('Testing view AllParty', async () => {
    let service = new AdminService();
    await service.getAllParty().then((result) => {
        expect(result.data.length).toBeGreaterThanOrEqual(0);
    })
})

test.skip('Testing add Party', async () => {
    let service = new AdminService();
    let party = `{

           
    "regId": "MNS01",
    "partyName": "MNS",
    "symbol": "Engine",
    "leader": "Raj Thackrey"
          
    }
    `
    await service.addParty(JSON.parse(party)).then((result) => {
        console.log(result.data)
        expect(result.data).toBe('party with id regId is added')
    })
})

test.skip('Testing remove party', async () => {
    let service = new AdminService();
    await service.deletePartyById(MNS01).then((result) => {
        console.log(result.data)
        expect(result.data).toBe('party with the given Id deleted')
    })
})






