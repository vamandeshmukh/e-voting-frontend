import EoService from "./EoService";


beforeEach(()=>{
    console.log('beforeEach called')
});

afterEach(()=>{
    console.log('AfterEach called')
});

test('Testing find voter by id', async () => {
    let service = new EoService();
    let result = await service.getVoterById(333300001111);

    expect(result.data.voterFirstName).toBe('Soham')
})

test('Testing view AllVoters', async () => {
    let service = new EoService();
    await service.getAllVoters().then((result) => {
    expect(result.data.length).toBeGreaterThanOrEqual(0);
    })
})


test('Testing view AllVoterRequest', async () => {
    let service = new EoService();
    await service.getAllVoterRequests().then((result) => {
         console.log(result.data)
    expect(result.data.length).toBeGreaterThanOrEqual(0);
    })
})


test.skip('Testing voter status Name by aadhar', async () => {
    let service = new EoService();
    let voter =
     `{
            "aadhar":"999999999991",
            "updatedstatus": "approved"
           
    }
    `
    await service.updateVoterStatus(JSON.parse(voter)).then((result) => {
        console.log(result.data)
        expect(result.data).toBe("voter is validated with id 999999999991")
    })
})