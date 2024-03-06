
from django.urls import include, path
from rest_framework import routers

from tasks.views import TaskView

#Esto genera toidas las rutas del CRUD automáticamente
router = routers.DefaultRouter()
router.register('tasks', TaskView, 'tasks')
urlpatterns = [
    path('api/v1/', include(router.urls))
]