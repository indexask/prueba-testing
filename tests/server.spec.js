const request = require("supertest");
const server = require("../index");

describe("CRUD", () => {
    //rate get cafes retorne 200 y que sea array con 1 object
    it ("/get product return array", async() =>{
        const response = await request(server).get("/cafes").send();
        const body = response.body;
        const statusCode = response.statusCode;
        expect(statusCode).toBe(200);
        expect(body).toBeInstanceOf(Array);
        expect(body.length).toBeGreaterThan(0);
    });

    // obetener codigo 404 al eliminar un cafe que no existe
    it ("/delete product not exist", async()=>{
        const jwt = "token";
        const idDeProductoAEliminar = 5;
        const response = await request(server)
        .delete(`/cafes/${idDeProductoAEliminar}`)
        .set("Authorization", jwt)
        .send();
        const statusCode = response.statusCode;
        expect(statusCode).toBe(404);
    });

    //ruta post cafe devuelva 2001
    it("add new coffe", async () => {
        const id = Math.floor(Math.random() * 999);
        const cafeNuevo = { id, nombre: "Frapuccino" };
        const response = await request(server).post("/cafes").send(cafeNuevo);
        const statusCode = response.statusCode;
        const body = response.body;
        expect(statusCode).toBe(201);
        expect(body).toContainEqual(cafeNuevo);
    });

    //ruta put que devuelva 400 al acutalizar cafe
    it("overwrite a product that does not exist", async () => {
        const idCafe = 2;
        const cafeUpdate = { id: 90,
        nombre: "Frapuccino"};
        const response = await request(server).put(`/cafes/${idCafe}`).send(cafeUpdate);
        const statusCode = response.statusCode;
        expect(statusCode).toBe(400);
    });

});
