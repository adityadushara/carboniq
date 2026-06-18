import pytest

def test_health_check(client):
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok", "database": "connected"}

def test_read_root(client):
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Welcome to CARBONIQ API"}

def test_get_me(client):
    response = client.get("/me")
    assert response.status_code == 200
    assert "user" in response.json()
    assert response.json()["user"]["id"] == "123e4567-e89b-12d3-a456-426614174000"

def test_create_goal(client):
    goal_data = {
        "title": "Test Goal",
        "description": "Test Desc",
        "target_value": 100,
        "unit": "kg"
    }
    response = client.post("/api/goals", json=goal_data)
    assert response.status_code == 200
    data = response.json()
    assert data["title"] == "Test Goal"
    assert data["target_value"] == 100.0

def test_get_goals(client):
    response = client.get("/api/goals")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_create_activity(client):
    activity_data = {
        "activity_type": "Transport",
        "description": "Bus ride",
        "emissions_kg": 2.5
    }
    response = client.post("/api/activities", json=activity_data)
    assert response.status_code == 200
    data = response.json()
    assert data["activity_type"] == "Transport"
    assert data["emissions_kg"] == 2.5

def test_get_activities(client):
    response = client.get("/api/activities")
    assert response.status_code == 200
    assert isinstance(response.json(), list)
