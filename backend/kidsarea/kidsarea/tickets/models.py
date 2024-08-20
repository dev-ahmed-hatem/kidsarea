from django.db import models
from users.models import Employee
from django.core.validators import MinValueValidator, MaxValueValidator
from django.utils.timezone import datetime, now, localtime
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


def cairo_date():
    # Convert the current time to the Cairo timezone and extract the date
    return localtime(now()).date()

class SaleTicket(models.Model):
    date = models.DateField(default=cairo_date)
    total_price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    discount = models.DecimalField(max_digits=5, decimal_places=2, default=0)
    after_discount = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    class Meta:
        ordering = ('-id',)

    def __str__(self):
        return f"Ticket #{self.id}"


class SaleTicketItem(models.Model):
    sale_ticket = models.ForeignKey(SaleTicket, related_name='items', on_delete=models.CASCADE)
    game = models.ForeignKey('games.Game', on_delete=models.CASCADE)
    amount = models.PositiveIntegerField(default=1)

    @property
    def total_price(self, *args, **kwargs):
        return self.game.price * self.amount

    def __str__(self):
        return f"{self.amount} x {self.game.name}"
