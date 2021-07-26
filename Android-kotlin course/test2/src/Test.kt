import java.util.*
import kotlin.math.floor
import kotlin.math.pow

fun main (args: Array<String>){
    println("Hello brave citizen of glorious Bug Kingdom!")
}

fun main (args: Array<String>){
    val name = readLine()
    println("Oh mighty ruler of Bug Kingdom, the earthling called $name seeks for your wisdom!")
}


fun calcChairs(bugs: Int) = bugs + bugs / 2

fun calcBugMoneyValue(dayNumber: Int, bugRank: Int, cashAmount: Int) = cashAmount * ((dayNumber * bugRank) + 42)

fun getYearEra(year: Int) =
    when {
        year < 1970 -> "before"
        year == 1970 -> "equals"
        year in (1971..2000) -> "after (XX century)"
        year in (2000..2100) -> "after (XXI century)"
        year > 2100 -> "distant future"
        else -> throw Exception()
    }

fun calculateEvenDigits(input: String) = input.map { Character.getNumericValue(it) }.filter { it % 2 == 0 }.sum()

fun calculateBugMentions(input: List<String>) = input.filter { it == "BUG" }.count()

class SimpleClass

class NibirunianClass(var namePlate: String = "") {

    fun createNamePlate(name: String) {
        namePlate = "Live long and prosper, $name"
    }
}

class SugarStorage(var volume: Int) {

    fun decreaseSugar(v: Int) {
        if (v > 0) {
            if (v > volume) volume = 0
            else volume -= v
        }
    }

    fun increaseSugar(v: Int) {
        if (v > 0) volume += v
    }
}

open class Bug(val rank: Int, val name: String) {

    open fun getSugarLimit() = rank

    fun getId() = "${rank}.${name}"
}

class BugCivilian(rank: Int, name: String): Bug(rank, name) {

    override fun getSugarLimit() = rank / 2
}

fun getCubeList(n: Int) = List(n) { i -> i * i * i }

fun calculateWordStat(input: String) = input.split(" ").groupingBy { it }.eachCount().maxBy { it.value }!!.key

fun exceptionExample() { throw Exception() }

class DogException(): Exception()
class CatException(): Exception()
fun checkClient(client: String) {
    when (client) {
        "dog" -> throw DogException()
        "cat" -> throw CatException()
    }
}

class SphinxesException(): Exception()

fun engineStatus(engineNumber: Int): String {
    return try {
        rawEngineStatus(engineNumber)
    } catch (e: Exception) {
        when (e) {
            is EngineNotFoundException -> "engine $engineNumber not found"
            is SensorsMeltException -> "engine $engineNumber offline"
            else -> e.localizedMessage
        }
    }
}

fun getLength(str: String?) = str?.length

fun getLength(str: String?) = str?.length ?: 0

fun getLength(str: String?) = str!!.length

fun calcNullValues(input: Array<Int?>) = arrayOf(input.count{ it == null }, input.sumBy { it ?: 0 })