from django.db import models

from v1.portfolio.models import Portfolio
from v1.data.models import StockName


class PortfolioStock(models.Model):
    portfolio = models.ForeignKey(Portfolio, on_delete=models.CASCADE)
    stock = models.ForeignKey(StockName, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    purchase_price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self) -> str:
        return f'{self.stock.name} bought by {self.portfolio.user.firstname} {self.portfolio.user.lastname}'
