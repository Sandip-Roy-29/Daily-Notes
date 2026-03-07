import  request  from "supertest";
import "../setup";
import { getAuthSetup } from "../utils/auth.util";
import app from "../../../src/app";
import { getNoteSetup } from "../utils/notes.util";

describe("Note creation", () => {
    let cookies;

    beforeEach(async () => {
        const authData = await getAuthSetup();
        cookies = authData.cookies;
    })

    test("should create a new note with valid credentials", async () => {
        const response = await request(app)
            .post("/api/v1/notes/")
            .set("Cookie", cookies)
            .send({
                title: "Daily habits",
                content: ["wake up at 6 am", "eat egg on breakfast"]
            })

        expect(response.statusCode).toBe(201);
        expect(response.body.data.title).toBe("Daily habits");
    })
    
    test("should create a new note without title", async () => {
        const response = await request(app)
            .post("/api/v1/notes/")
            .set("Cookie", cookies)
            .send({
                title: "",
                content: ["wake up at 6 am", "eat egg on breakfast"]
            })

        expect(response.statusCode).toBe(201);
        expect(response.body.data.title).toBe("Untitle");
    })
    
    test("should normalize string content with a array format", async () => {
        const response = await request(app)
            .post("/api/v1/notes/")
            .set("Cookie", cookies)
            .send({
                title: "Daily Habits",
                content: "wake up at 6 am"
            })
        
        expect(response.statusCode).toBe(201);
        expect(response.body.data.content[0].text).toBe("wake up at 6 am");
    })
    
    test("should not create a new note without content", async () => {
        const response = await request(app)
            .post("/api/v1/notes/")
            .set("Cookie", cookies)
            .send({
                title: "Daily Habits",
                content: ""
            })

        expect(response.statusCode).toBe(400);
    })
    
    test("should create a new note with content with \n", async () => {
        const response = await request(app)
            .post("/api/v1/notes/")
            .set("Cookie", cookies)
            .send({
                title: "Daily Habits",
                content: "I have to wakup at 6 am\nI need to go the office"
            })

        expect(response.statusCode).toBe(201);
        expect(response.body.data.content.length).toEqual(2);
    })
    
    test("should not create a new note without token", async () => {
        const response = await request(app)
            .post("/api/v1/notes/")
            .send({
                title: "Daily habits",
                content: ["wake up at 6 am", "eat egg on breakfast"]
            })

        expect(response.statusCode).toBe(401);
    })
})

describe("Note Title", () => {
    let authData;
    let noteData;
    const nonExistanceNote = "69804f6344ddd9661c20092d";
    const invalidIdFormat = "1234asd789fgh8765gfd";

    beforeEach(async () => {
        authData = await getAuthSetup();

        noteData = await getNoteSetup(authData.userId);
    })

    test("should title change with valid credentials", async () => {
        const response = await request(app)
            .put(`/api/v1/notes/${noteData._id}/title`)
            .set("Cookie", authData.cookies)
            .send({
                title: "Daily Habit"
            })
        
        expect(response.statusCode).toBe(200);
        expect(response.body.data.title).toBe("Daily Habit");
    })
    
    test("should title not change without new title", async () => {
        const response = await request(app)
            .put(`/api/v1/notes/${noteData._id}/title`)
            .set("Cookie", authData.cookies)
            .send({
                title: ""
            })
        
        expect(response.statusCode).toBe(400);
    })
    
    test("should title not change with same title", async () => {
        const response = await request(app)
            .put(`/api/v1/notes/${noteData._id}/title`)
            .set("Cookie", authData.cookies)
            .send({
                title: "Default test title"
            })
        
        expect(response.statusCode).toBe(400);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe("Title is unchanged");    
    })
    
    test("should not change the title of non existence note", async () => {
        const response = await request(app)
            .put(`/api/v1/notes/${nonExistanceNote}/title`)
            .set("Cookie", authData.cookies)
            .send({
                title: "Default test title"
            })
        
        expect(response.statusCode).toBe(404);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe("Note does not exist");    
    })
    
    test("should not change the title with invalid id", async () => {
        const response = await request(app)
            .put(`/api/v1/notes/${invalidIdFormat}/title`)
            .set("Cookie", authData.cookies)
            .send({
                title: "Default test title"
            })
        
        expect(response.statusCode).toBe(400);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe("Invalid note id");    
    })
    
    test("should title not change without token", async () => {
        const response = await request(app)
            .put(`/api/v1/notes/${noteData._id}/title`)
            .send({
                title: "Default test title"
            })
        
        expect(response.statusCode).toBe(401);
    })
})

describe("Note delete", () => {
    let authData;
    let noteData;
    const nonExistanceNote = "69804f6344ddd9661c20092d";
    const invalidIdFormat = "1234asd789fgh8765gfd";
    const emptyNoteId = "";

    beforeEach(async() => {
        authData = await getAuthSetup();
        noteData = await getNoteSetup(authData.userId);
    })

    test("should delete note with valid credentials", async () => {
        const response = await request(app)
            .delete(`/api/v1/notes/${noteData._id}`)
            .set("Cookie", authData.cookies)

        expect(response.statusCode).toBe(200);
    })
    
    test("should not delete nonexistence note", async () => {
        const response = await request(app)
            .delete(`/api/v1/notes/${nonExistanceNote}`)
            .set("Cookie", authData.cookies)

        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBe("Note does not exist");
    })
    
    test("should not delete note with invalid id", async () => {
        const response = await request(app)
            .delete(`/api/v1/notes/${invalidIdFormat}`)
            .set("Cookie", authData.cookies)

        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("Invalid note id");
    })
    
    test("should not delete note without token", async () => {
        const response = await request(app)
            .delete(`/api/v1/notes/${noteData._id}`)

        expect(response.statusCode).toBe(401);
    })
})

describe("Get All notes", () => {
    let authData;
    
    beforeEach(async () => {
        authData = await getAuthSetup();
    })

    test("should fetch data with valid credentials", async () => {
        const response = await request(app)
            .get("/api/v1/notes/")
            .set("Cookie", authData.cookies)

        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe("Current note fetched successfully");
    })
    
    test("should not fetch data without token", async () => {
        const response = await request(app)
            .get("/api/v1/notes/")

        expect(response.statusCode).toBe(401);
    })
})

describe("Add Contents", () => {
    let authData;
    let noteData;
    const nonExistanceNote = "69804f6344ddd9661c20092d";
    const invalidIdFormat = "1234asd789fgh8765gfd";

    beforeEach(async () => {
        authData = await getAuthSetup();
        noteData = await getNoteSetup(authData.userId);
    })

    test("should add content with valid credentials", async () => {
        const response = await request(app)
            .post(`/api/v1/notes/${noteData._id}/contents`)
            .set("Cookie", authData.cookies)
            .send({
                content: ["I have to wake up at 6am","I need to go to the office within 10 am"]
            })
        
        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe("Content created successfully");
    })
    
    test("should add content with a content", async () => {
        const response = await request(app)
            .post(`/api/v1/notes/${noteData._id}/contents`)
            .set("Cookie", authData.cookies)
            .send({
                content: "I have to wake up at 6am"
            })
            
        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe("Content created successfully");
    })
    
    test("should not add content without content", async () => {
        const response = await request(app)
            .post(`/api/v1/notes/${noteData._id}/contents`)
            .set("Cookie", authData.cookies)
            .send({
                content: ""
            })

        expect(response.statusCode).toBe(400);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe("Content is required");
    })
    
    test("should not add content of nonexistence note", async () => {
        const response = await request(app)
            .post(`/api/v1/notes/${nonExistanceNote}/contents`)
            .set("Cookie", authData.cookies)
            .send({
                content: "I have to wake up at 6 am"
            })

        expect(response.statusCode).toBe(404);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe("Note does not exist");
    })
    
    test("should not add content with invalid id", async () => {
        const response = await request(app)
            .post(`/api/v1/notes/${invalidIdFormat}/contents`)
            .set("Cookie", authData.cookies)
            .send({
                content: "I have to wake up at 6 am"
            })

        expect(response.statusCode).toBe(400);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe("Invalid note id");
    })
    
    test("should not add content without token", async () => {
        const response = await request(app)
            .post(`/api/v1/notes/${noteData._id}/contents`)
            .send({
                content: ["I have to wake up at 6am","I need to go to the office within 10 am"]
            })

        expect(response.statusCode).toBe(401);
    })
})

describe("Current note contents", () => {
    let authData;
    let noteData;
    const nonExistanceNote = "69804f6344ddd9661c20092d";
    const invalidIdFormat = "1234asd789fgh8765gfd";

    beforeEach(async () => {
        authData = await getAuthSetup();
        noteData = await getNoteSetup(authData.userId);
    })

    test("should get current note contents with valid credentials", async () => {
        const response = await request(app)
            .get(`/api/v1/notes/${noteData._id}/contents`)
            .set("Cookie", authData.cookies)

        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe("All contents fetched successfully");
    })
    
    test("should not get current note contents of nonexistence note", async () => {
        const response = await request(app)
            .get(`/api/v1/notes/${nonExistanceNote}/contents`)
            .set("Cookie", authData.cookies)

        expect(response.statusCode).toBe(404);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe("Note does not exist");
    })
    
    test("should not get current note contents with invalid id", async () => {
        const response = await request(app)
            .get(`/api/v1/notes/${invalidIdFormat}/contents`)
            .set("Cookie", authData.cookies)

        expect(response.statusCode).toBe(400);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe("Invalid note id");
    })
    
    test("should not get current note contents without token", async () => {
        const response = await request(app)
            .get(`/api/v1/notes/${noteData._id}/contents`)

        expect(response.statusCode).toBe(401);
    })
})

describe("Current note", () => {
    let authData;
    let noteData;
    const nonExistanceNote = "69804f6344ddd9661c20092d";
    const invalidIdFormat = "1234asd789fgh8765gfd";

    beforeEach(async () => {
        authData = await getAuthSetup();
        noteData = await getNoteSetup(authData.userId);
    })

    test("should fetch current not with valid credentials", async () => {
        const response = await request(app)
            .get(`/api/v1/notes/${noteData._id}`)
            .set("Cookie", authData.cookies)

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe("Current note fetched successfully");
    })
    
    test("should not fetch nonexistence note", async () => {
        const response = await request(app)
            .get(`/api/v1/notes/${nonExistanceNote}`)
            .set("Cookie", authData.cookies)

        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBe("Note does not exist");
    })
    
    test("should not fetch not with invalid id", async () => {
        const response = await request(app)
            .get(`/api/v1/notes/${invalidIdFormat}`)
            .set("Cookie", authData.cookies)

        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("Invalid note id");
    })
    
    test("should not fetch current not without token", async () => {
        const response = await request(app)
            .get(`/api/v1/notes/${noteData._id}`)

        expect(response.statusCode).toBe(401);
    })
})

describe("Update content", () => {
    let authData;
    let noteData;
    const nonExistanceNote = "69804f6344ddd9661c20092d";
    const nonExistenceContent = "69804f6344ddd9661c20092e";
    const invalidContentIdFormat = "1234asd789fgh8765gfd";
    const invalidNoteIdFormat = "1234567wertyui9865fghj";

    beforeEach(async () => {
        authData = await getAuthSetup();
        noteData = await getNoteSetup(authData.userId);
    })

    test("should update content with valid credentials", async () => {
        const response = await request(app)
            .put(`/api/v1/notes/${noteData._id}/contents/${noteData.content[0]._id}`)
            .set("Cookie", authData.cookies)
            .send({
                text: "Updated content"
            })
        
        expect(response.statusCode).toBe(200);
        expect(response.body.data.content[0].text).toBe("Updated content");
    })
    
    test("should not update content without new content", async () => {
        const response = await request(app)
            .put(`/api/v1/notes/${noteData._id}/contents/${noteData.content[0]._id}`)
            .set("Cookie", authData.cookies)
            .send({
                text: ""
            })
        
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("Updated text is required");
    })
    
    test("should not update content of nonexistence note", async () => {
        const response = await request(app)
            .put(`/api/v1/notes/${nonExistanceNote}/contents/${noteData.content[0]._id}`)
            .set("Cookie", authData.cookies)
            .send({
                text: "Updated content"
            })
        
        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBe("Note does not exist");
    })
    
    test("should not update content with invalid note id", async () => {
        const response = await request(app)
            .put(`/api/v1/notes/${invalidNoteIdFormat}/contents/${noteData.content[0]._id}`)
            .set("Cookie", authData.cookies)
            .send({
                text: "Updated content"
            })
        
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("Invalid note id");
    })
    
    test("should not update content of a nonexistence content", async () => {
        const response = await request(app)
            .put(`/api/v1/notes/${noteData._id}/contents/${nonExistenceContent}`)
            .set("Cookie", authData.cookies)
            .send({
                text: "Updated content"
            })
        
        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBe("Content does not belongs to this note");
    })
    
    test("should not update content with invalid content id", async () => {
        const response = await request(app)
            .put(`/api/v1/notes/${noteData._id}/contents/${invalidContentIdFormat}`)
            .set("Cookie", authData.cookies)
            .send({
                text: "Updated content"
            })
        
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("Invalid content id");
    })
    
    test("should not update content without token", async () => {
        const response = await request(app)
            .put(`/api/v1/notes/${noteData._id}/contents/${noteData.content[0]._id}`)
            .send({
                text: "Updated content"
            })
        
        expect(response.statusCode).toBe(401);
    })
})

describe("Delete content", () => {
    let authData;
    let noteData;
    const nonExistanceNote = "69804f6344ddd9661c20092d";
    const nonExistenceContent = "69804f6344ddd9661c20092e";
    const invalidContentIdFormat = "1234asd789fgh8765gfd";
    const invalidNoteIdFormat = "1234567wertyui9865fghj";

    beforeEach(async () => {
        authData = await getAuthSetup();
        noteData = await getNoteSetup(authData.userId);
    })

    test("should delete content with valid credentials", async () => {
        const response  = await request(app)
            .delete(`/api/v1/notes/${noteData._id}/contents/${noteData.content[0]._id}`)
            .set("Cookie", authData.cookies)

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe("Content deleted successfully");
        expect(response.body.data.content.length).toBe(0);
    })
    
    test("should not delete content of nonexistence note", async () => {
        const response  = await request(app)
            .delete(`/api/v1/notes/${nonExistanceNote}/contents/${noteData.content[0]._id}`)
            .set("Cookie", authData.cookies)

        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBe("Note does not exist");
    })
    
    test("should not delete content with invalid note id", async () => {
        const response  = await request(app)
            .delete(`/api/v1/notes/${invalidNoteIdFormat}/contents/${noteData.content[0]._id}`)
            .set("Cookie", authData.cookies)

        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("Invalid note id");
    })
    
    test("should not delete content of nonexistence content", async () => {
        const response  = await request(app)
            .delete(`/api/v1/notes/${noteData._id}/contents/${nonExistenceContent}`)
            .set("Cookie", authData.cookies)

        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBe("Content does not belongs to this note");
    })
    
    test("should not delete content with invalid content id", async () => {
        const response  = await request(app)
            .delete(`/api/v1/notes/${noteData._id}/contents/${invalidContentIdFormat}`)
            .set("Cookie", authData.cookies)

        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("Invalid content id");
    })
    
    test("should not delete content without token", async () => {
        const response  = await request(app)
            .delete(`/api/v1/notes/${noteData._id}/contents/${noteData.content[0]._id}`)

        expect(response.statusCode).toBe(401);
    })
})

describe("Cross user access", () => {
    let userA;
    let userB;
    let userBNoteData;
    
    beforeEach(async() => {
        userA = await getAuthSetup("A", "A@gmail.com");
        userB = await getAuthSetup("B", "B@gmail.com");

        userBNoteData = await getNoteSetup(userB.userId);
    })

    test("should user A not update user B note title", async () => {
        const response = await request(app)
            .put(`/api/v1/notes/${userBNoteData._id}/title`)
            .set("Cookie", userA.cookies)
            .send({
                title: "Updated title"
            })
        expect(response.statusCode).toBe(403);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe("You are not allowed to modify this note");
    })
    
    test("should user A not update user B note content", async () => {
        const response = await request(app)
            .put(`/api/v1/notes/${userBNoteData._id}/contents/${userBNoteData.content[0]._id}`)
            .set("Cookie", userA.cookies)
            .send({
                text: "Updated content"
            })
        expect(response.statusCode).toBe(403);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe("You are not allowed to modify this note");
    })
    
    test("should user A not delete user B note content", async () => {
        const response = await request(app)
            .delete(`/api/v1/notes/${userBNoteData._id}/contents/${userBNoteData.content[0]._id}`)
            .set("Cookie", userA.cookies)

        expect(response.statusCode).toBe(403);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe("You are not allowed to modify this note");
    })
    
    test("should user A not delete user B note", async () => {
        const response = await request(app)
            .delete(`/api/v1/notes/${userBNoteData._id}`)
            .set("Cookie", userA.cookies)

        expect(response.statusCode).toBe(403);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe("You are not allowed to modify this note");
    })
    
    test("should user A not add content in user B note", async () => {
        const response = await request(app)
            .post(`/api/v1/notes/${userBNoteData._id}/contents`)
            .set("Cookie", userA.cookies)
            .send({
                content: ["I have to wake up at 6am","I need to go to the office within 10 am"]
            })

        expect(response.statusCode).toBe(403);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe("You are not allowed to modify this note");
    })
    
    test("should user A not fetch content of user B note", async () => {
        const response = await request(app)
            .get(`/api/v1/notes/${userBNoteData._id}/contents`)
            .set("Cookie", userA.cookies)

        expect(response.statusCode).toBe(403);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe("You are not allowed to modify this note");
    })
    
    test("should user A not fetch user B note", async () => {
        const response = await request(app)
            .get(`/api/v1/notes/${userBNoteData._id}`)
            .set("Cookie", userA.cookies)

        expect(response.statusCode).toBe(403);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe("You are not allowed to modify this note");
    })
})