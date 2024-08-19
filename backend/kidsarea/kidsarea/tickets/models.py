from django.db import models
from users.models import Employee
from django.core.validators import MinValueValidator, MaxValueValidator
from django.utils.timezone import datetime
from decimal import Decimal


class Ticket(models.Model):
    date = models.DateField()
    amount = models.IntegerField()
    game = models.ForeignKey('games.Game', on_delete=models.CASCADE)

    def __str__(self):
        return f" تذكرة{self.id} - {self.date}"

    @property
    def total_price(self):
        return self.amount * self.game.price
