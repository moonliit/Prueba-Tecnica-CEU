from django.test import TestCase
from workshops.models import Workshop
from django.utils import timezone
from datetime import timedelta


class WorkshopModelTest(TestCase):
    def test_workshop_creation(self):
        workshop = Workshop.objects.create(
            name="Test Workshop",
            description="Test description",
            start_date=timezone.now() + timedelta(days=1),
            category="Test",
        )

        self.assertEqual(workshop.name, "Test Workshop")

    def test_str_representation(self):
        workshop = Workshop.objects.create(
            name="Readable name",
            description="Desc",
            start_date=timezone.now() + timedelta(days=1),
            category="Dev",
        )

        self.assertEqual(str(workshop), "Readable name")


from rest_framework.test import APITestCase
from rest_framework import status
from django.utils import timezone
from datetime import timedelta


class WorkshopAPITest(APITestCase):
    def test_create_workshop(self):
        data = {
            "name": "API Workshop",
            "description": "Created via API",
            "start_date": (timezone.now() + timedelta(days=1)).isoformat(),
            "category": "Development",
        }

        response = self.client.post("/api/workshops/", data, format="json")

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.json()["name"], "API Workshop")

    def test_list_workshops(self):
        Workshop.objects.create(
            name="Workshop 1",
            description="Desc",
            start_date=timezone.now() + timedelta(days=1),
            category="Development",
        )

        response = self.client.get("/api/workshops/")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.json()), 1)

    def test_retrieve_workshop(self):
        workshop = Workshop.objects.create(
            name="Single Workshop",
            description="Desc",
            start_date=timezone.now() + timedelta(days=1),
            category="Data",
        )

        response = self.client.get(f"/api/workshops/{workshop.pk}/")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json()["name"], "Single Workshop")

    def test_update_workshop_name(self):
        workshop = Workshop.objects.create(
            name="Old Name",
            description="Desc",
            start_date=timezone.now() + timedelta(days=1),
            category="Dev",
        )

        response = self.client.patch(
            f"/api/workshops/{workshop.pk}/",
            {"name": "New Name"},
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json()["name"], "New Name")

    def test_delete_workshop(self):
        workshop = Workshop.objects.create(
            name="To delete",
            description="Desc",
            start_date=timezone.now() + timedelta(days=1),
            category="Dev",
        )

        response = self.client.delete(f"/api/workshops/{workshop.pk}/")

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Workshop.objects.filter(id=workshop.pk).exists())

    def test_name_required(self):
        data = {
            "name": "",
            "description": "No name",
            "start_date": (timezone.now() + timedelta(days=1)).isoformat(),
            "category": "Dev",
        }

        response = self.client.post("/api/workshops/", data, format="json")

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("name", response.json())

    def test_category_required(self):
        data = {
            "name": "Missing category",
            "description": "No name",
            "start_date": (timezone.now() + timedelta(days=1)).isoformat(),
            "category": "",
        }

        response = self.client.post("/api/workshops/", data, format="json")

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("category", response.json())

    def test_start_date_required(self):
        data = {
            "name": "Missing date",
            "description": "Desc",
            "category": "Dev",
        }

        response = self.client.post("/api/workshops/", data, format="json")

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("start_date", response.json())

    def test_cannot_create_workshop_with_past_date(self):
        data = {
            "name": "Invalid Workshop",
            "description": "Past date",
            "start_date": (timezone.now() - timedelta(days=1)).isoformat(),
            "category": "Development",
        }

        response = self.client.post("/api/workshops/", data, format="json")

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("start_date", response.json())

    def test_filter_workshops_by_category(self):
        Workshop.objects.create(
            name="Dev Workshop",
            description="Desc",
            start_date=timezone.now() + timedelta(days=1),
            category="Development",
        )
        Workshop.objects.create(
            name="Design Workshop",
            description="Desc",
            start_date=timezone.now() + timedelta(days=1),
            category="Design",
        )

        response = self.client.get("/api/workshops/?category=Design")

        self.assertEqual(len(response.json()), 1)
        self.assertEqual(response.json()[0]["category"], "Design")
