from rest_framework.routers import DefaultRouter
from workshops.views import WorkshopViewSet

router = DefaultRouter()
router.register("workshops", WorkshopViewSet)

urlpatterns = router.urls
