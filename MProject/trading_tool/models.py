from django.db import models
from django.contrib.auth.models import User


# Create your models here.

class StockTable(models.Model):
    user= models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    name= models.CharField(max_length=200)
    buyprice= models.IntegerField()
    quantity= models.IntegerField()

    def __str__(self):
        return self.name  