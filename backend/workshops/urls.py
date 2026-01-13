from rest_framework.routers import DefaultRouter
from workshops.views import WorkshopViewSet

router = DefaultRouter()
router.register("talleres", WorkshopViewSet)

urlpatterns = router.urls
