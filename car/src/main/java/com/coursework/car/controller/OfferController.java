package com.coursework.car.controller;

import com.coursework.car.model.Offer;
import com.coursework.car.model.OfferDto;
import com.coursework.car.repositories.OfferRepository;
import com.coursework.car.service.OfferService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@Validated
@RestController
@RequestMapping(value = "offer")
public class OfferController {

    @Autowired
    OfferService offerService;

    @GetMapping
    public List<OfferDto> getOffers() {
        return offerService.getAllOffers();
    }

    @GetMapping("/{id}")
    public OfferDto getOfferById(@PathVariable Long id) {
        return offerService.getOfferById(id);
    }

    @GetMapping("/user/{id}")
    public List<OfferDto> getOffersByUser(@PathVariable Long id) {
        return offerService.getOffersByUserId(id);
    }

    @PostMapping
    public void saveOffer(@Valid @RequestBody OfferDto newOffer) {
        offerService.saveOffer(newOffer);
    }

    @DeleteMapping("/{id}")
    public void deleteOffer(@PathVariable Long id) {
        offerService.deleteOffer(id);
    }
}
